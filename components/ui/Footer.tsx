import React from "react";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-100 shadow-2xl text-base-content p-4 border">
      <aside className="">
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          STREAMER
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
