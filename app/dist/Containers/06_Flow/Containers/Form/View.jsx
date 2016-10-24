/**
 * Created by arShown on 2016/10/13.
 */
//@flow
import React from 'react';
import BaseView, {ApplyStyles, connectToView} from '~/Core/BaseView';
import {add} from '../../Action';
import type {MemberDataType} from '../../Type';

/**
 * Form 元件只負責處理表單操作
 */

@ApplyStyles()
class Form extends BaseView {
    //資料序號
    uidIndex:number;
    //記錄新增欄位內容
    state:MemberDataType;

    constructor(props, context) {
        super(props, context);
        this.uidIndex = 1;
        this.state = this.initializeState();
    }

    initializeState():MemberDataType {
        return {
            uid: this.uidIndex,
            name: "",
            gender: "male",
            married: false
        }
    }

    changeHandler(stateKey:string, e:Object):void {
        //根據欄位更新 state
        this.setState({
            [stateKey]: stateKey === "married" ? e.target.value === "true" : e.target.value
        })
    }

    validate():boolean {
        //檢查有沒有輸入 name
        const {name} = this.state;
        if (!name)
            return false;
        return true;
    }

    submit(e):void {
        e.preventDefault();
        if (this.state && this.validate()) {
            //執行新增 action
            this.dispatch(add(this.state));
            //新增增加 uid 序號
            this.uidIndex += 1;
            //初始化表單
            this.setState(this.initializeState());
        }
    }

    render() {
        const {name, married, gender} = this.state;
        return (
            <form>
                <div styleName="form-group">
                    <label>Name (*)</label>
                    <input type="type" value={name} onChange={this.changeHandler.bind(this,"name")}
                           styleName="form-control"/>
                </div>
                <div styleName="form-group">
                    <label>Marital status</label>
                    <br/>
                    <label styleName="radio-inline">
                        <input type="radio" onChange={this.changeHandler.bind(this,"married")} name="marry"
                               value="false"
                               checked={!married}/> Unmarried
                    </label>
                    <label styleName="radio-inline">
                        <input type="radio" onChange={this.changeHandler.bind(this,"married")} name="marry"
                               value="true" checked={married}/>
                        Married
                    </label>
                </div>
                <div styleName="form-group">
                    <label>Gender</label>
                    <br/>
                    <label styleName="radio-inline">
                        <input type="radio" onChange={this.changeHandler.bind(this,"gender")} name="gender" value="male"
                               checked={gender === "male"}/> Male
                    </label>
                    <label styleName="radio-inline">
                        <input type="radio" onChange={this.changeHandler.bind(this,"gender")} name="gender"
                               checked={gender === "female"} value="female"/> Female
                    </label>
                </div>
                <button styleName="btn btn-primary" onClick={this.submit.bind(this)}>submit</button>
            </form>
        );
    }
}

export default connectToView()(Form);