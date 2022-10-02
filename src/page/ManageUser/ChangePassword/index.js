import { Button } from "@mui/material";
import style from './index.module.css'
function ChangePassword(){
    return(
        <div>
          <form className={style.FormInfoAccount}>
           <div className="d-flex flex-column">
             <span >Mật khẩu hiện tại</span>
             <input className="border py-[12px] px-[10px] rounded-[10px]" id="current-password" type="password" placeholder="Input current password"/>
           </div>
           <div className={style.ContainerInputPassword}>
               <div className="d-flex flex-column mt-4">
                 <span >Mật khẩu mới</span>
                 <input className={`${style.InputPassword} border py-[12px] px-[10px] rounded-[10px]`} id="password" type="password" placeholder="Input new password"/>
               </div>
               <div className="d-flex flex-column mt-4">
                 <span>Nhập lại mật khẩu</span>
                 <input className={`${style.InputPassword} border py-[12px] px-[10px] rounded-[10px]`} id="confirm-password" type="password" placeholder="Input confirm password"/>
               </div>
           </div>
           <Button className="mt-4 d-flex" variant="contained">CẬP NHẬT</Button>
        </form>
        </div>
    )
};
export default ChangePassword;