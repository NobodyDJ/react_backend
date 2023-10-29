import api from '@/api'
import { MenuType } from '@/types/api'
import { Form, Input, Button, Table, Space, Select, App } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
import { formatDate } from '@/utils'
import CreateMenu from './CreateMenu'
export default function MenuList() {
  const [form] = useForm()
	const [data, setData] = useState<MenuType.MenuItem[]>([])
	const { message, modal } = App.useApp()

  const menuRef = useRef<{
    open: (type: IAction, data?: MenuType.EditParams | { parentId?: string, orderBy?: number }) => void
  }>()

  useEffect(() => {
    getMenuList()
  }, [])

  // 获取用户列表
  const getMenuList = async () => {
    const data = await api.getMenuList(form.getFieldsValue())
    setData(data)
  }

  // 重置
  const handleReset = () => {
    form.resetFields()
  }

  // 创建部门
  const handleCreate = () => {
		menuRef.current?.open('create', {
			orderBy: data.length
		})
  }

  const handleSubCreate = (id: string) => {
    menuRef.current?.open('create', { parentId: id })
  }

  // 编辑部门
  const handleEdit = (record: MenuType.MenuItem) => {
    menuRef.current?.open('edit', record)
  }

	const handleDelete = (record: MenuType.MenuItem) => {
		let text = ''
    if (record.menuType == 1) text = '菜单'
    if (record.menuType == 2) text = '按钮'
    if (record.menuType == 3) text = '页面'
    modal.confirm({
      title: '确认',
			content: `确认删除该${text}吗？`,
			okText:'确定',
      cancelText:'取消',
      onOk() {
        handleDelSubmit(record._id)
      }
    })
  }

  // 删除提交
  const handleDelSubmit = async (_id: string) => {
    await api.delMenuById({
      _id
    })
    message.success('删除成功')
    getMenuList()
  }

  const columns: ColumnsType<MenuType.MenuItem> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName'
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon'
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render(menuType: number) {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面'
        }[menuType]
      }
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode'
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleSubCreate(record._id)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDelete(record)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
  return (
    <div>
      <Form className='search-form' layout='inline' form={form}>
        <Form.Item label='菜单名称' name='menuName'>
          <Input placeholder='菜单名称' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Select style={{ width: 100 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type='primary' className='mr10' onClick={getMenuList}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>菜单列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={columns} dataSource={data} pagination={false} />
			</div>
			<CreateMenu mRef={menuRef} update={getMenuList} />
    </div>
  )
}
