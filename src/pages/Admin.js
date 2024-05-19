import { useState } from "react"
import AddItems from "../components/AddItems";
import ListItems from "../components/ListItems";

const Admin = () => {
    const [addItems,setAddItems] = useState(false);
    const [listItems,setListItems] = useState(false);

    const handleAddItems=()=>{
        setAddItems(true);
        setListItems(false);

    }
    const handleListtems=()=>{
        setListItems(true);
        setAddItems(false);

    }
  return (
    <>
    <section className='admin-section'>
<div className='inner-admin-section'>
    <div className='admin-list-box'>
        <ul className="admin-box-ul">
            <li className="admin-box-li" onClick={handleAddItems}><i className="bi bi-plus-circle"></i>Add Items</li>
            <li className="admin-box-li" onClick={handleListtems}><i className="bi bi-card-checklist" ></i>List Items</li>
            <li className="admin-box-li"><i class="bi bi-list"></i>Orders</li>

        </ul>
    </div>
    <div className="show-addmin-components">
        {addItems && <AddItems/>}
        {listItems && <ListItems/>}
    </div>
</div>
    </section>
    </>
  )
}

export default Admin