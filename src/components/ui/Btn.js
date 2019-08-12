import React from "react";
import "../../assets/css/sass/uiComponents/btn.scss";
import {Button} from "reactstrap";
import classNames from "classnames";

const Btn = React.memo(({ loading, icon, children, className = "", color, ...rest}) => {

  const myClass = classNames({
    "myBtn": true,
    "isLoading": loading,
    "hasIcon": icon
  });

  return (
    <Button
      color={color || 'primary'}
      className={myClass + " " + className}
      {...rest}
    >
      {
        (typeof icon === "string") ?
          <i className={`mr-1 btn-icon ${icon}`}/>
          : <span className='customIcon'>
                      {icon}
                  </span>
      }
      {children}
    </Button>
  );
});

export default Btn;
