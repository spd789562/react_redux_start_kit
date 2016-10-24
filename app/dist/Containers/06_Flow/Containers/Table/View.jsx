/**
 * Created by arShown on 2016/10/13.
 */
//@flow
import React from 'react';
import BaseView, {ApplyStyles, connectToView} from '~/Core/BaseView';
import Constant from '../../Constant';
import {remove} from '../../Action';
import type {MemberDataType} from '../../Type';

/**
 * Table 元件綁定 state 負責監聽資料的異動
 */

@ApplyStyles()
class Table extends BaseView {

    constructor(props, context) {
        super(props, context);
    }

    removeHandler(uid:number):void {
        this.dispatch(remove(uid));
    }

    render() {
        const memberStore:Array<MemberDataType> = this.getResponse();
        const dataRow:any = memberStore.length > 0 ? memberStore.map((item:MemberDataType, index:number) => {
            const {uid, name, gender, married} = item;
            return (
                <tr key={uid}>
                    <td>{+index + 1}</td>
                    <td>{name}</td>
                    <td>{gender === "female" ? "F" : "M"}</td>
                    <td>{married ? "YES" : "NO"}</td>
                    <td>
                        <button styleName="btn btn-danger btn-xs" onClick={this.removeHandler.bind(this,uid)}>
                            <i styleName="glyphicon glyphicon-trash"/>
                        </button>
                    </td>
                </tr>
            );
        }) : (
            <tr>
                <td colSpan={5} styleName="text-center text-muted">Empty !</td>
            </tr>
        );
        return (
            <div styleName="table-responsive">
                <table styleName="table table-condensed">
                    <thead>
                    <tr>
                        <td>#</td>
                        <td>name</td>
                        <td>gender</td>
                        <td>married</td>
                        <td>actions</td>
                    </tr>
                    </thead>
                    <tbody>
                    {dataRow}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connectToView(Constant.StoreKey)(Table);