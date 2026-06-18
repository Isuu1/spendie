const Footer = () => {
  return (
    <div className="mt-16 mb-8">
      <div className="flex justify-between items-center">
        <h2>Spendie.</h2>
        <ul className="list-none flex gap-4 flex-wrap text-base">
          <li className="cursor-pointer hover:text-accent transition-colors">
            Home
          </li>
          <li className="cursor-pointer hover:text-accent transition-colors">
            Features
          </li>
          <li className="cursor-pointer hover:text-accent transition-colors">
            About
          </li>
          <li className="cursor-pointer hover:text-accent transition-colors">
            Contact
          </li>
        </ul>
      </div>

      <div className="flex justify-between gap-2 mt-8">
        <p>© 2025 Spendie</p>
        <div className="flex gap-2">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
