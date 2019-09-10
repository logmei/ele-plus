const constantParams = {
    name:'ConstantsParam',
    TABLECOLUMNSTYPE : {
      IMAGE: {
        key: 'img',
        label: '图标',
        style: 'width:30px;height:30px'
      },
      BUTTON: {
        key: 'button',
        label: '操作',
        type: 'primary',
        styleType: 'plain'
      },
      DATA: {
        key: 'data'
      }
    },
    FILTERTYPE : {
      INPUT: {
        key: 'input',
        description: '输入框'
      },
      SELECT: {
        key: 'select',
        description: '选择框'
      },
      DATEPICKERRANGE: {
        key: 'datepickerrange',
        description: '日期范围',
        format: 'yyyy-MM-dd'
      },
      DATEPICKER: {
        key: 'datepicker',
        description: '日期',
        format: 'yyyy-MM-dd'
      },
      HIDDEN: {
        key: 'hidden',
        description: '隐藏输入框'
      }
    }
}

export default constantParams
