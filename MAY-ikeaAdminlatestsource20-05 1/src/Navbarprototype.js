// import Icon from "@ant-design/icons/lib/components/Icon";
import { Menu } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import { useState } from "react";
import sanitizeHtml from 'sanitize-html';
import Icon from '@ant-design/icons';
// import DOMPurify from "isomorphic-dompurify";

function Navbarprototype() {
  const [roleMenu1, setRoleMenu] = useState(
    sessionStorage.getItem("Role_Menu")
  );

  const menuData1 = roleMenu1.replace(/\\/g, "");
  const menuData2 = menuData1.substring(16, menuData1.length - 3);
  const menuData3 = "[" + menuData2 + "]";
  const menuData4 = JSON.parse(menuData3);
  //console.log(menuData4);
  const [openKeys, setOpenKeys] = React.useState([]);

  const iconStyle = {
    marginTop: "5px",
    marginLeft: "5px",
    fontSize: "25px",
    backgroundColor: "#064785",
    borderRadius: "5px",
    padding: "2px",
  };

  const iconSubStyle = {
    marginLeft: "5px",
    fontSize: "20px",
    backgroundColor: "#064785",
    borderRadius: "5px",
    padding: "2px",
  };
  //   const [menuArray, setMenuArray] = useState([menuData4]);

  //   console.log(menuData4);

  //   Object.entries(menuData4).forEach((q) => {
  //     // console.log(q);
  //     q.forEach((w, i) => {
  //       console.log(w);
  //     });
  //   });
  // const Menukeys = Object.keys(menuData4);
  //   console.log(Menukeys);

  //   Menukeys.forEach((key, index) => {
  //     console.log(`${key}: ${menuData4[key]}`);
  //   });

  //   Object.entries(menuData4).forEach((key, value) => {
  //     console.log(key, value);
  //     key.forEach((q, i) => {
  //       q.SubMenu.map((e, t) => {
  //         console.log(e, t);
  //       });
  //     });
  //   });

  //   console.log(menuArray);

  //   const navbarmainmenu = menuData4.map((q, i) => {
  //     return (
  //       <Menu key={i}>
  //         <MenuItem>{q.menuName}</MenuItem>
  //       </Menu>
  //     );
  //   });
  //   const navbarsubmenu = menuData4.map((q, i) => {
  //     return q.subMenu.map((w, e) => {
  //       if (q.subMenu.length != 0 && q.menuName === navbarmainmenu) {
  //         return (
  //           <SubMenu>
  //             <Menu key={e}>
  //               <MenuItem>{w.menuName}</MenuItem>
  //             </Menu>
  //           </SubMenu>
  //         );
  //       } else {
  //         <SubMenu>
  //           <Menu key={e}>
  //             <MenuItem>{w.menuName}</MenuItem>
  //           </Menu>
  //         </SubMenu>;
  //       }
  //     });
  //   });

  // menuData4.forEach(e => {
  //     console.log(e)
  //     Object.entries(e).forEach(f=>{
  //         // console.log(f)
  //         f.forEach(g=>{
  //             console.log(g)
  //         })
  //     })
  // });

  // menuData4.map((q,i)=>{
  //     // console.log(q)
  //     if(q.subMenu.length != 0){
  //         q.subMenu.map((e,j) => {
  //             console.log(e)
  //             console.log(j)
  //             return(

  //             )

  //         });
  //     }
  // })
  // q.subMenu.for (let index = 0; index < array.length; index++) {
  //     const element = array[index];

  // }
  // console.log(i)

  // Object.entries(q).forEach((e,w)=>{
  //     console.log(e)
  // })

  // console.log(navbarmainmenu)
  // console.log(navbarsubmenu)
  // menuData4.forEach((q)=>{
  // Object.entries(menuData4).forEach((w,e) => {
  //      console.log(w)

  // })
  // })
  //    Object.entries(menuData4).forEach(([key, value]) => {
  //    Object.entries(value).forEach((q,i)=>{
  //     console.log(i.SubMenu)
  //    })

  //     });



  menuData4.map((q, i) => {
    // console.log(q.menuIcon)
    // console.log(q.menuName);
    q.subMenu.map((e, t) => {
      // console.log(e.menuIcon);
      // console.log(e.menuName);
    });
  });

  const handleclick = (event) => {
    // console.log(event.keyPath[0])
    //console.log(event.key)
  };


  const rootSubmenuKeys = ["Master", "Setup", "Reports"];

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  // const menuandsubmenu = menuData4.map((q, i) => {
  //   return (
  //     <Menu
  //       mode="inline"
  //       theme="light"
  //       onClick={(event) => handleclick(event)}
  //     >
  //       {q.subMenu.length === 0 && (
  //         <>
  //           {sanitizeHtml(q.menuIcon)}
  //           {/* <div dangerouslySetInnerHTML={q.menuIcon}/> */}
  //           <MenuItem key={q.menuLink} >{q.menuName}</MenuItem>
  //         </>
  //       )}
  //       {q?.subMenu.length && (
  //         <>

  //           {/* {q.menuIcon} */}
  //           {sanitizeHtml(q.menuIcon)}

  //           <SubMenu
  //             title={
  //               <span
  //                 style={{
  //                   fontSize: "19px",
  //                   bottom: "5px",
  //                   position: "relative",
  //                   color: "black",
  //                 }}
  //               >
  //                 {q.menuName}
  //               </span>
  //             }
  //           >
  //             {q.subMenu.map((e, t) => (
  //               <>
  //                 {/* <svg>{e.menuIcon}</svg> */}
  //                 {sanitizeHtml(e.menuIcon)}
  //                 <MenuItem key={e.menuLink}>{e.menuName}</MenuItem>
  //               </>
  //             ))}
  //           </SubMenu>
  //         </>
  //       )}
  //     </Menu>
  //   );
  // })

  return (
    <>
      {/* {menuData4.map((q, i) => {
        return (
          <Menu mode="inline" theme="light">
            {q.subMenu?.length === 0 ?? (
              <MenuItem key={q}> {q.menuName}</MenuItem>
            )}
            {q.subMenu?.length !== 0 ?? (
              <SubMenu
                title={
                  <span
                    style={{
                      fontSize: "19px",
                      bottom: "5px",
                      position: "relative",
                      color: "white",
                    }}
                  >
                    {q.menuName}
                  </span>
                }
              >
                {q.subMenu.map((e, t) => {
                  return <MenuItem key={t}>{q.menuName}</MenuItem>;
                })}
              </SubMenu>
            )}
          </Menu>
        );
      })} */}



      {menuData4.map((q, i) => {
        return (
          <Menu
            mode="inline"
            theme="light"
            onClick={(event) => handleclick(event)}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
          >
            {q?.subMenu.length === 0 && (
              <>

                {/* <div className="icons" dangerouslySetInnerHTML={{ __html: q.menuIcon }} /> */}
                <MenuItem key={q.menuLink}
                //  icon={< a className="icons" dangerouslySetInnerHTML={{ __html: q.menuIcon }} />}
                ><Icon dangerouslySetInnerHTML={{ __html: q.menuIcon }} style={iconStyle} theme="outlined" />{q.menuName}</MenuItem>
              </>
            )}
            {q?.subMenu.length && (
              <>


                <SubMenu
                  key={q.menuLink}
                  title={
                    <span
                      style={{
                        fontSize: "19px",
                        bottom: "5px",
                        position: "relative",
                        color: "black",
                      }}
                    >
                      <MenuItem
                      ><Icon dangerouslySetInnerHTML={{ __html: q.menuIcon }} style={iconStyle} theme="outlined" />{q.menuName}</MenuItem>

                    </span>
                  }
                >
                  {q.subMenu.map((e, t) => (

                    // <>

                    //   <div dangerouslySetInnerHTML={{ __html: e.menuIcon }} />
                    //   <MenuItem key={e.menuLink}>{e.menuName}</MenuItem>
                    // </>
                    <>

                      {/* <div className="icons" dangerouslySetInnerHTML={{ __html: q.menuIcon }} /> */}
                      < MenuItem key={e.menuLink}
                      //  icon={< a className="icons" dangerouslySetInnerHTML={{ __html: q.menuIcon }} />}
                      > <Icon dangerouslySetInnerHTML={{ __html: e.menuIcon }} style={iconSubStyle} theme="outlined" />{e.menuName}</MenuItem>
                    </>
                  ))}
                </SubMenu>
              </>
            )}
          </Menu>
        );
      })}


      {/* <div>{ menuandsubmenu}</div> */}

      {/* {menuData4.map((q,i)=>{
    return(
<Menu key={i}>
<MenuItem>{q.menuName}</MenuItem>
</Menu>
    )
})} */}
      {/* {menuData4.map((q,i)=>{
    // console.log(q)
    if(q.subMenu.length !== 0){
        q.subMenu.map((e,j) => {
            console.log(e)
            console.log(j)
            return(
                <Menu key={j}>
                    <MenuItem onClick={()=>{console.log("clicked")}}>{e.menuName}</MenuItem>
                </Menu>
            )

        });
    }
})} */}

      {/* {menuData4.foreach((q, i) => {
        q.subMenu.foreach((w, e) => {
          if (q.subMenu.length !== 0 && q.menuName === navbarmainmenu) {
            <SubMenu>
              <Menu key={e}>
                <MenuItem>{w.menuName}</MenuItem>
              </Menu>
            </SubMenu>;
          } else {
            <SubMenu>
              <Menu key={e}>
                <MenuItem>{w.menuName}</MenuItem>
              </Menu>
            </SubMenu>;
          }
        });
      })} */}
    </>
  );
}

export default Navbarprototype;

{
  /* {menuData4.map((q, i) => {
                return (
<Menu key={i}>
<MenuItem>{q.menuName}
</MenuItem>
{q.subMenu != 0?? q.subMenu.map((w,e)=>{
    return(
        <SubMenu key={w}>{e.menuName}</SubMenu>
    )
})}
</Menu>
    )
            }
            )} */
}
