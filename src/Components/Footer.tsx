
const Footer = () => {
  let DateNow = new Date();
return (
    <footer className="flex font-[Arial] fixed bottom-0 left-0 w-full z-50 bg-gray-500 text-white h-12 text-sm items-center p-3 justify-center">
     {DateNow.getFullYear()} &copy;  Holiday.co
    </footer>
  );
};

export default Footer;
