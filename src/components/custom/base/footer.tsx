import React from "react";

const Footer = () => {
  return (
    <footer className="text-center py-4 text-sm bg-primary text-primary-foreground mt-8">
      &copy; {new Date().getFullYear()} Resume Builder
    </footer>
  );
};

export default Footer;
