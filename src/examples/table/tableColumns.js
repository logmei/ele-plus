import { parseTimeMilliSecond } from '../../../packages/utils/index.js'
import { ConstantParams } from '../../../packages/index.js'
// 合同列表列
const contractColumns = [
  { label: '合同名称', name: 'title', fixed: 'left', minWidth: 155 },
  { label: '客户名称', name: 'name', fixed: 'left' },
  { label: '机构ID', name: 'mechNo' },
  { label: '智慧脸账号', name: 'account' },
  { label: '省份', name: 'province' },
  { label: '签约类型', name: 'signTypeVal' },
  { label: '合同金额', name: 'amount' },
  { label: '对应商机', name: 'opptyName', minWidth: 155 },
  { label: '合同开始日期', name: 'startTime', formater: formaterByDay, width: 140 },
  { label: '合同截止日期', name: 'endTime', formater: formaterByDay, width: 140 },
  { label: '审批状态', name: 'approvalStateVal' },
  { label: '一级审批人', name: 'firApprPer', width: 100 },
  { label: '二级审批人', name: 'secApprPer', width: 100 },
  { label: '当前阶段', name: 'stateVal' },
  { label: '创建人', name: 'creator' },
  { label: '创建时间', name: 'createTime', formater, width: 140 },
  { label: '驳回原因', name: 'rejectReason' },
  {
    authority: true,
    valueType: ConstantParams.TABLECOLUMNSTYPE.BUTTON.key,
    label: ConstantParams.TABLECOLUMNSTYPE.BUTTON.label,
    name: '',
    value: [{
      label: '查看',
      entity: ConstantParams.TABLECOLUMNSTYPE.BUTTON,
      callBackFunName: 'handleClick'
    }
    ],
    fixed: 'right',
    width: 100
  }
]
// 年月日时分
function formater(v) {
  const cFormat = '{y}-{m}-{d} {h}:{i}'
  const val = v === null || v === 'null' ? '------' : parseTimeMilliSecond(v, cFormat)
  // console.log('formater', val)
  return val
}
// 年月日
function formaterByDay(v) {
  const cFormat = '{y}-{m}-{d}'
  return v === null || v === 'null' ? '------' : parseTimeMilliSecond(v, cFormat)
}

/** 模板
 *authority:权限（默认为true）
  valueType:列中数据类型（默认data）'@/utils/constantsParam.js'->TABLECOLUMNSTYPE
  label:列头名
  name：普通数据对应tableData中的字段
  formater：回调函数
  value:操作列
 * const contractColumns = [
  {
    authority: true,
    valueType: ConstantsParam.TABLECOLUMNSTYPE.IMAGE.key,
    label: ConstantsParam.TABLECOLUMNSTYPE.IMAGE.label,
    name: '',
    value: [{
      src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg',
      callBackFunName: 'show1',
      alt: '图片1',
      style: ConstantsParam.TABLECOLUMNSTYPE.IMAGE.style
    },
    {
      src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg',
      callBackFunName: 'show2',
      alt: '图片2',
      style: ConstantsParam.TABLECOLUMNSTYPE.IMAGE.style
    }],
    fixed: 'left',
    width: 50
  },
  { label: '合同编号', name: 'number', fixed: 'left' },
  { label: '合同名称', name: 'title', fixed: 'left', minWidth: 155 },
  { label: '客户名称', name: 'name', fixed: 'left' },
  { label: '机构ID', name: 'mechNo' },
  { label: '智慧脸账号', name: 'account' },
  { label: '省份', name: 'province' },
  { label: '签约类型', name: 'signTypeVal' },
  { label: '合同金额', name: 'amount' },
  { label: '对应商机', name: 'opptyName', minWidth: 155 },
  { label: '合同开始日期', name: 'startTime', formater, width: 140 },
  { label: '合同结束日期', name: 'endTime', formater, width: 140 },
  { label: '审批状态', name: 'approvalStateVal' },
  { label: '一级审批人', name: 'firApprPer', width: 100 },
  { label: '二级审批人', name: 'secApprPer', width: 100 },
  { label: '当前阶段', name: 'stateVal' },
  { label: '创建人', name: 'creator' },
  { label: '创建时间', name: 'createTime', formater, width: 140 },
  { label: '驳回原因', name: 'rejectReason' },
  {
    authority: true,
    valueType: ConstantsParam.TABLECOLUMNSTYPE.BUTTON.key,
    label: ConstantsParam.TABLECOLUMNSTYPE.BUTTON.label,
    name: '',
    value: [{
      label: '编辑',
      entity: ConstantsParam.TABLECOLUMNSTYPE.BUTTON,
      callBackFunName: 'show3'
    },
    { label: '查看',
      entity: ConstantsParam.TABLECOLUMNSTYPE.BUTTON,
      callBackFunName: 'show4'
    }
    ],
    fixed: 'right',
    width: 50
  }
]
 */
export default contractColumns