import { useLocation, useNavigate } from "react-router-dom";
import { FileImageOutlined, FileOutlined, PlusOutlined, PlusSquareOutlined, SoundOutlined, UnorderedListOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Menu } from "antd";


export default () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return <>
    <h5 className="fg-light center">امکانات</h5>
    <Menu
      mode="inline"
      theme="dark"
      defaultSelectedKeys={[pathname]}
      items={[
        {
          key: '/',
          label: 'صفحه اصلی',
          onClick: () => navigate('/')
        },
        {
          label: 'بلاگ',
          key: 'blog',
          children: [
            {
              key: '/note',
              label: 'فهرست نوشته ها',
              icon: <UnorderedListOutlined />,
              onClick: () => navigate('/note')
            },
            {
              key: '/note/add',
              label: 'افزودن نوشته',
              icon: <PlusSquareOutlined />,
              onClick: () => navigate('/note/add')
            },
            {
              key: '/category',
              label: 'دسته بندی ها',
              icon: <UnorderedListOutlined />,
              onClick: () => navigate('/category')
            },
            {
              key: '/category/add',
              label: 'افزودن دسته بندی',
              icon: <PlusSquareOutlined />,
              onClick: () => navigate('/category/add')
            },
          ]
        },
        { type: 'divider' },
        {
          label: 'اپلیکیشن',
          key: 'datapack',
          children: [
            {
              label: 'فهرست صفحات',
              key: 'list',
              icon: <UnorderedListOutlined />,
              onClick: () => navigate('datapack')
            },
            {
              label: 'افزودن صفحه',
              key: '',
              icon: <PlusOutlined />,
              onClick: () => navigate('datapack/add')
            },
          ]
        },
        { type: 'divider' },
        {
          label: 'مدیریت فایل ها',
          key: 'file',
          children: [
            {
              key: '/file/photo',
              label: 'تصاویر',
              icon: <FileImageOutlined />,
              onClick: () => navigate('file/photo')
            },
            {
              key: '/file/audio',
              label: 'صوتی',
              icon: <SoundOutlined />,
              onClick: () => navigate('file/audio')
            },
            {
              key: '/file/video',
              label: 'فیلم',
              icon: <VideoCameraOutlined />,
              onClick: () => navigate('file/video')
            },
            {
              key: '/file/doc',
              label: 'اسناد',
              icon: <FileOutlined />,
              onClick: () => navigate('file/doc')
            },
          ]
        },
      ]}
    />
  </>
}