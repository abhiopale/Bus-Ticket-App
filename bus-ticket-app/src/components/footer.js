import React from "react";

const Footer = () => {
  return (
    <div>
      <footer class="page-footer blue accent-3">
        <div class="container">
          <div class="row">
            <div class="col l6 s12">
              <h5 class="white-text">Bus Ticket App</h5>
              <p class="grey-text text-lighten-4">
                Rush and book your first ticket on India's top bus ticketing app
              </p>
            </div>
            <div class="col l4 offset-l2 s12">
              <h5 class="white-text">Contact Us</h5>
              <ul>
                <li>
                  <a
                    class="grey-text text-lighten-3"
                    href="abhiopale@gmail.com"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <div class="container">© 2022 Copyright Bus Ticket App</div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
