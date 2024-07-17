import React from "react";

const SuperNav = () => {
  return (
    <div class="top-bar">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <a href="ff" class="">
              <i class="mr-2 fa fa-envelope" aria-hidden="true"></i>

              <span class="d-none d-md-inline-block">info@yourdomain.com</span>
            </a>
            <span class="mx-md-2 d-inline-block"></span>
            <a href="dd" class="">
              <i class="mr-2 fa fa-phone" aria-hidden="true"></i>

              <span class="d-none d-md-inline-block">6005341553</span>
            </a>

            <div class="float-right">
              <a href="rr" class="">
                <i class="mr-2 fa fa-instagram" aria-hidden="true"></i>
                <span class="d-none d-md-inline-block">Instagram</span>
              </a>
              <span class="mx-md-2 d-inline-block"></span>
              <a href="rr" class="">
                <i class="mr-2 fa fa-facebook" aria-hidden="true"></i>

                <span class="d-none d-md-inline-block">Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperNav;
