import style from './index.module.css'
function HistoryTransaction() {
    return ( 
        <div className={style.ContainerHistoryTransaction}>
            <div>
                <h1 className={style.TextHistory}>Lịch sử giao dịch</h1>
                <ul className={style.MenuHistory}>
                   <li>Ngày</li>
                   <li>Mã</li>
                   <li>Tên loại hình</li>
                   <li>Giá</li>
                   <li>Trạng thái</li>
                </ul>
                <div className={style.ContainerItemHistory}>
                    <ul className={style.ItemHistory}>
                        <li>11/09/2002 03:56</li>
                        <li>KHGK</li>
                        <li>How to pull off vintage internor design that still works day</li>
                        <li>2,189,000đ</li>
                        <li>chưa hoàn thành</li>
                    </ul>
                </div>
            </div>
        </div>
     );
}

export default HistoryTransaction;