
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, View,
    Button, TextInput,
    AsyncStorage,
    SwipeableFlatList, TouchableHighlight,//侧滑列表

} from 'react-native';

import Toast,{DURATION} from 'react-native-easy-toast';//导入弹出框组件


export default class Storage extends Component{

    //保存数据
    save=()=>{
        storage.save({
            key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
            data: {
                from: 'some other site',
                userId: 'some userId',
                token: 'some token'
            },

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: 1000 * 3600
        });
        this.toast.show('保存成功', DURATION.LENGTH_LONG);//设置提示框，并设置持续时间
    };


    //取出数据
    get=()=> {
        storage.load({
            key: 'loginState',

            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
            syncInBackground: true,

        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
            // 你只能在then这个方法内继续处理ret数据
            // 而不能在then以外处理
            // 也没有办法“变成”同步返回
            // 你也可以使用“看似”同步的async/await语法
            this.toast.show(ret.userId+'取出成功', DURATION.LENGTH_LONG);


        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    this.toast.show('取出失败:NotFoundError', DURATION.LENGTH_LONG);
                    break;
                case 'ExpiredError':
                    this.toast.show('取出失败:ExpiredError', DURATION.LENGTH_LONG);
                    break;
            }
        });
    };

    //移除数据
    remove=()=>{
        // 删除单个数据
        storage.remove({
            key: 'loginState'
        });
        alert('删除成功')

    };

    render() {
        return (
            <View style={styles.container}>

                <Button
                    title="保存"
                    onPress={()=>{this.save()}}
                />

                <Button
                    title="取出"
                    onPress={()=>{this.get()}}
                />

                <Button
                    title="删除"
                    onPress={()=>{this.remove()}}
                />

                <Toast ref={toast=> {//提示框展示位置
                    this.toast = toast
                }}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#daffde',
    },

});