import iCustomerLogo from "../../assets/images/iCustomer_logo.png";

const Header = () => {

  return (
    <div className="bg-[#f2f2f2] flex gap-10 items-center">
      <div className="w-1/8">
        <img alt="brand-logo" src={iCustomerLogo} width={250} />
      </div>
    </div>
  );
};

export default Header;
