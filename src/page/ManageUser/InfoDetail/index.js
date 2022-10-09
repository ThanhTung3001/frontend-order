import style from './index.module.css'
import Button from '@mui/material/Button'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
function InfoDetail(){
  const [UserInfo , SetUserInfo] = useState(JSON.parse(localStorage.getItem('UserInfo')));
  const formik = useFormik({
    initialValues:{
      email : '',
      name : '',
      phone : ''
    },
    validationSchema : Yup.object({
      name : Yup.string().required('Họ và tên khồng được để trống').min(2,'Tên phải lớn 2 kí tự'),
      email : Yup.string().required('Email không được để trống').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Email không đúng với định dạng'),
      phone : Yup.string().required('Số điện thoại không được để trống').matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g,'Số điện thoại khồng đúng định dạng')
    }),
    onSubmit : (values)=>{
      console.log(values);
    }
  });
  const HandleUpdate = ()=>{
    if(formik.errors.email == '' && formik.errors.name == '' && formik.errors.phone == ''){
      //nếu như có lỗi thì k được update
      alert('update failed')
    }
    else{
      alert('update success')
    }
  }
  console.log(UserInfo);
   return(
      <div>
          <form onSubmit={formik.handleSubmit} className={style.FormInfoAccount}>
           <div className="d-flex flex-column">
             <span >Email</span>
             <input className="border py-[12px] px-[10px] rounded-[10px]" id="email" value={UserInfo.user.email} onChange={formik.handleChange}  type="email" placeholder="Input email"/>
             {formik.errors.email && (<span className={style.validateText}>{formik.errors.email}</span>)}
           </div>
           <div className="d-flex flex-column mt-2">
             <span>Họ tên</span>
             <input className="border py-[12px] px-[10px] rounded-[10px]" id="name" value={UserInfo.user.username} onChange={formik.handleChange} type="text" placeholder="Input Name"/>
             {formik.errors.name && (<span className={style.validateText}>{formik.errors.name}</span>)}
           </div>
           <div className="d-flex flex-column mt-2">
             <span>Số điện thoại</span>
             <input className="border py-[12px] px-[10px] rounded-[10px]" id="phone" value={formik.values.phone} onChange={formik.handleChange} type="text" placeholder="Input Phone Number"/>
             {formik.errors.phone && (<span className={style.validateText}>{formik.errors.phone}</span>)}
           </div>
           <button onClick={()=>{HandleUpdate()}} className={`BtnStyle mt-4 d-flex`}>CẬP NHẬT</button>
        </form>
      
      </div>

   )
}
export default InfoDetail;