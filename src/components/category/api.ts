import { ApiResult } from "../../class/model/api"
import Category from "../../class/model/category"

export const loadCategory = async ():Promise<ApiResult<Category>>=> {
    await new Promise( resolve => setTimeout(resolve, 1500) )
    return {
        success:true,
        data:{
            id:'root',
            label:'root',
            children:[
                {
                    id:'121321-8546',
                    label:'برنامه نویسی backend',
                    children:[
                        {
                            id:'123321-8986',
                            label:'node.js',
                            children:[
                                {
                                    id:'198321-8546',
                                    label:'express.js',
                                    children:[]
                                },
                                {
                                    id:'123389-8546',
                                    label:'fastify',
                                    children:[]
                                },
                            ]
                        }, 
                        {
                            id:'121741-8546',
                            label:'python',
                            children:[]
                        },
                        {
                            id:'123261-8546',
                            label:'java',
                            children:[]
                        },
                        {
                            id:'123321-8874',
                            label:'c#',
                            children:[]
                        },
                    ]
                },
                {
                    id:'122321-8546',
                    label:'برنامه نویسی frontend',
                    children:[]
                },
                {
                    id:'124321-8546',
                    label:'برنامه نویسی موبایل',
                    children:[
                        {
                            id:'123321-8566',
                            label:'flutter',
                            children:[]
                        },
                        {
                            id:'129981-8546',
                            label:'native android',
                            children:[]
                        },
                        {
                            id:'126211-8546',
                            label:'swift and ios',
                            children:[]
                        },                        
                    ]
                },
                
            ]
        }
    }
}