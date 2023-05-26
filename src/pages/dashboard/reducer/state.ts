export interface State {
  card:{
      author:Card,
      users:Card,
      notes:Card,
      category:Card
  }
  reports:Report[]
}

export interface Card {
  title:string
  subtitle:string
  value:number
}

export interface Report {
  title:string
  description:string
  dateTime:string
}

export const initialState:State = {
  card: {
      author: {
          title:"مدیران",
          subtitle:"مدیران و نویسندگان سیستم",
          value:0
      },
      users: {
          title:"کاربران",
          subtitle:"کاربران و دستگاه نضب شده",
          value:0
      },
      notes: {
          title:"نوشته",
          subtitle:"نوشته های منتشر شده",
          value:0
      },
      category: {
          title:"دسته بندی",
          subtitle:"دسته بندی های مطالب",
          value:0
      }
  },
  reports:[
      {
          title:"بسته بندی جدید",
          description:"دسته بندی جدید 'برنامه نویسی جاوا' توسط 'admin' اضافه گردید",
          dateTime:"20 شهریور 1401 22:16:06"
      },
      {
          title:"بسته بندی جدید",
          description:"دسته بندی جدید 'برنامه نویسی جاوا' توسط 'admin' اضافه گردید",
          dateTime:"20 شهریور 1401 22:16:06"
      },
      {
          title:"بسته بندی جدید",
          description:"دسته بندی جدید 'برنامه نویسی جاوا' توسط 'admin' اضافه گردید",
          dateTime:"20 شهریور 1401 22:16:06"
      },
      {
          title:"بسته بندی جدید",
          description:"دسته بندی جدید 'برنامه نویسی جاوا' توسط 'admin' اضافه گردید",
          dateTime:"20 شهریور 1401 22:16:06"
      },
      {
          title:"بسته بندی جدید",
          description:"دسته بندی جدید 'برنامه نویسی جاوا' توسط 'admin' اضافه گردید",
          dateTime:"20 شهریور 1401 22:16:06"
      },
              
  ]
}
