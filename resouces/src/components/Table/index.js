import React from 'react';
import {Table as AntdTable} from 'antd';
import className from 'classnames';
import './style.less';

const Table = (props)=>{

	const {dataSource} = props;


	const classes = className({
		"ant-table-normal": dataSource.length > 0
	});
	

	return <AntdTable className={classes} {...props} />

}

export default Table;