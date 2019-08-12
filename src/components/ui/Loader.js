import React from "react";
import classNames from "classnames";
import "../../assets/css/sass/uiComponents/loader.scss";

const Loader = ({ fullscreen, fullHeight }) => {
  const classes = classNames({
    "loaderContainer": true,
    "fullscreen": fullscreen,
    "fullHeight":fullHeight
  });
    return (
      <div className={classes}>
            <div className="lds-css">
                <div className="lds-double-ring">
                  <div/>
                  <div/>
                </div>
            </div>
        </div>
    );
};

export default Loader;
