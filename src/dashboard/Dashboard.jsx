import React from "react";
import Logo from "../assets/logo.png"
import { Link, useLocation, useNavigate } from "react-router-dom";
import Products from "./components/Products";
import Customers from "./components/Customers";
import Categories from "./components/Categories";
import Orders from "./components/Orders";
import DashboardHome from "./components/DashboardHome";
import { axiosClient } from "../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../utils/localStorageManager";
import Coupons from "./components/Coupons";

const navigationList = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:fill-[#4F80E1] fill-[#637381]"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.53955 0.907986C8.81038 0.697338 9.18962 0.697338 9.46045 0.907986L16.2105 6.15799C16.3931 6.30008 16.5 6.51856 16.5 6.75V15C16.5 15.5967 16.2629 16.169 15.841 16.591C15.419 17.0129 14.8467 17.25 14.25 17.25H3.75C3.15326 17.25 2.58097 17.0129 2.15901 16.591C1.73705 16.169 1.5 15.5967 1.5 15V6.75C1.5 6.51856 1.60685 6.30008 1.78954 6.15799L8.53955 0.907986ZM3 7.11681V15C3 15.1989 3.07902 15.3897 3.21967 15.5303C3.36032 15.671 3.55109 15.75 3.75 15.75H14.25C14.4489 15.75 14.6397 15.671 14.7803 15.5303C14.921 15.3897 15 15.1989 15 15V7.11681L9 2.45015L3 7.11681Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 9C6 8.58579 6.33579 8.25 6.75 8.25H11.25C11.6642 8.25 12 8.58579 12 9V16.5C12 16.9142 11.6642 17.25 11.25 17.25C10.8358 17.25 10.5 16.9142 10.5 16.5V9.75H7.5V16.5C7.5 16.9142 7.16421 17.25 6.75 17.25C6.33579 17.25 6 16.9142 6 16.5V9Z"
        />
      </svg>
    ),
  },
  {
    name: "Products",
    path: "/admin/dashboard/products",
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:fill-[#4F80E1] fill-[#637381]"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.5 2.25C1.5 1.83579 1.83579 1.5 2.25 1.5H7.5C7.91421 1.5 8.25 1.83579 8.25 2.25V7.5C8.25 7.91421 7.91421 8.25 7.5 8.25H2.25C1.83579 8.25 1.5 7.91421 1.5 7.5V2.25ZM3 3V6.75H6.75V3H3Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.75 2.25C9.75 1.83579 10.0858 1.5 10.5 1.5H15.75C16.1642 1.5 16.5 1.83579 16.5 2.25V7.5C16.5 7.91421 16.1642 8.25 15.75 8.25H10.5C10.0858 8.25 9.75 7.91421 9.75 7.5V2.25ZM11.25 3V6.75H15V3H11.25Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.75 10.5C9.75 10.0858 10.0858 9.75 10.5 9.75H15.75C16.1642 9.75 16.5 10.0858 16.5 10.5V15.75C16.5 16.1642 16.1642 16.5 15.75 16.5H10.5C10.0858 16.5 9.75 16.1642 9.75 15.75V10.5ZM11.25 11.25V15H15V11.25H11.25Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.5 10.5C1.5 10.0858 1.83579 9.75 2.25 9.75H7.5C7.91421 9.75 8.25 10.0858 8.25 10.5V15.75C8.25 16.1642 7.91421 16.5 7.5 16.5H2.25C1.83579 16.5 1.5 16.1642 1.5 15.75V10.5ZM3 11.25V15H6.75V11.25H3Z"
        />
      </svg>
    ),
  },
  {
    name: "Categories",
    path: "/admin/dashboard/categories",
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:fill-[#4F80E1] fill-[#637381]"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.87661 1.05204C8.21826 0.855165 8.60566 0.751526 9 0.751526C9.39435 0.751526 9.78177 0.855173 10.1234 1.05207C10.124 1.05237 10.1245 1.05267 10.125 1.05297L15.375 4.05296C15.7167 4.25025 16.0005 4.53392 16.198 4.87553C16.3954 5.21713 16.4996 5.60465 16.5 5.99922V12.0008C16.4996 12.3953 16.3954 12.7828 16.198 13.1244C16.0005 13.4661 15.7167 13.7497 15.375 13.947L15.3721 13.9487L10.125 16.947C10.1245 16.9473 10.1241 16.9475 10.1237 16.9478C9.78194 17.1448 9.39444 17.2485 9 17.2485C8.60558 17.2485 8.21809 17.1448 7.87639 16.9478C7.87593 16.9475 7.87546 16.9473 7.875 16.947L2.6279 13.9487L2.625 13.947C2.2833 13.7497 1.99948 13.4661 1.80202 13.1244C1.60456 12.7828 1.5004 12.3953 1.5 12.0008V5.99922C1.5004 5.60465 1.60456 5.21713 1.80202 4.87553C1.99948 4.53392 2.2833 4.25025 2.625 4.05297L2.62789 4.0513L7.87661 1.05204ZM9 2.25153C8.86835 2.25153 8.73901 2.28618 8.625 2.35201L8.62211 2.35368L3.375 5.35201C3.37461 5.35223 3.37421 5.35246 3.37382 5.35269C3.26044 5.41842 3.16626 5.51272 3.10067 5.62619C3.03491 5.73997 3.00019 5.86902 3 6.00043V11.9995C3.00019 12.131 3.03491 12.26 3.10067 12.3738C3.16626 12.4873 3.26044 12.5816 3.37382 12.6473C3.37421 12.6475 3.37461 12.6477 3.375 12.648L8.625 15.648C8.73901 15.7138 8.86835 15.7485 9 15.7485C9.13165 15.7485 9.26098 15.7138 9.375 15.648L9.3779 15.6463L14.625 12.648C14.6254 12.6477 14.6258 12.6475 14.6262 12.6473C14.7396 12.5816 14.8337 12.4873 14.8993 12.3738C14.9651 12.2599 14.9999 12.1307 15 11.9992V6.00076C14.9999 5.86923 14.9651 5.74006 14.8993 5.62619C14.8337 5.51272 14.7396 5.41843 14.6262 5.3527C14.6258 5.35247 14.6254 5.35224 14.625 5.35201L9.375 2.35201C9.26098 2.28619 9.13165 2.25153 9 2.25153Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.80331 4.84446C2.01072 4.48591 2.46951 4.36339 2.82806 4.5708L9.00002 8.14106L15.172 4.5708C15.5305 4.36339 15.9893 4.48591 16.1967 4.84446C16.4041 5.20301 16.2816 5.6618 15.9231 5.86921L9.37556 9.65671C9.14323 9.7911 8.8568 9.7911 8.62447 9.65671L2.07697 5.86921C1.71843 5.6618 1.59591 5.20301 1.80331 4.84446Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 8.25C9.41421 8.25 9.75 8.58579 9.75 9V16.56C9.75 16.9742 9.41421 17.31 9 17.31C8.58579 17.31 8.25 16.9742 8.25 16.56V9C8.25 8.58579 8.58579 8.25 9 8.25Z"
        />
      </svg>
    ),
  },

  {
    name: "Customers",
    path: "/admin/dashboard/customers",
    svg: (
      <svg
        width="19"
        height="17"
        viewBox="0 0 19 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:fill-[#4F80E1] fill-[#637381]"
      >
        <path
          d="M13.8763 11.2356C14.2831 10.9579 14.7602 10.8009 15.2524 10.783C15.7447 10.765 16.232 10.8868 16.6579 11.1343C17.0838 11.3817 17.431 11.7447 17.6592 12.1812C17.8874 12.6177 17.9874 13.1099 17.9476 13.6009C16.9043 13.9655 15.7961 14.1074 14.6946 14.0174C14.6912 13.0318 14.4074 12.0667 13.8763 11.2365C13.4049 10.4972 12.7547 9.88872 11.9857 9.46739C11.2168 9.04606 10.354 8.82548 9.47718 8.82608C8.60052 8.82563 7.7379 9.04627 6.96912 9.4676C6.20034 9.88892 5.55023 10.4973 5.07892 11.2365M14.6937 14.0165L14.6946 14.0435C14.6946 14.2391 14.6841 14.4322 14.6624 14.6226C13.0844 15.5279 11.2964 16.0029 9.47718 16C7.59022 16 5.81892 15.4991 4.29197 14.6226C4.26961 14.4214 4.25887 14.219 4.25979 14.0165M4.25979 14.0165C3.1586 14.1098 2.05102 13.9684 1.00849 13.6017C0.968796 13.1109 1.06883 12.6189 1.29704 12.1825C1.52524 11.7461 1.87229 11.3833 2.29806 11.1359C2.72382 10.8885 3.21092 10.7666 3.70303 10.7845C4.19513 10.8023 4.67215 10.959 5.07892 11.2365M4.25979 14.0165C4.26292 13.0311 4.54816 12.0668 5.07892 11.2365M12.0859 3.60869C12.0859 4.30056 11.811 4.96409 11.3218 5.45332C10.8326 5.94254 10.169 6.21739 9.47718 6.21739C8.78531 6.21739 8.12178 5.94254 7.63255 5.45332C7.14333 4.96409 6.86849 4.30056 6.86849 3.60869C6.86849 2.91682 7.14333 2.25329 7.63255 1.76407C8.12178 1.27484 8.78531 1 9.47718 1C10.169 1 10.8326 1.27484 11.3218 1.76407C11.811 2.25329 12.0859 2.91682 12.0859 3.60869ZM17.3033 6.21739C17.3033 6.47432 17.2527 6.72874 17.1543 6.96612C17.056 7.20349 16.9119 7.41918 16.7302 7.60086C16.5485 7.78253 16.3328 7.92665 16.0955 8.02498C15.8581 8.1233 15.6037 8.17391 15.3467 8.17391C15.0898 8.17391 14.8354 8.1233 14.598 8.02498C14.3606 7.92665 14.145 7.78253 13.9633 7.60086C13.7816 7.41918 13.6375 7.20349 13.5392 6.96612C13.4408 6.72874 13.3902 6.47432 13.3902 6.21739C13.3902 5.69849 13.5964 5.20084 13.9633 4.83392C14.3302 4.467 14.8278 4.26087 15.3467 4.26087C15.8656 4.26087 16.3633 4.467 16.7302 4.83392C17.0971 5.20084 17.3033 5.69849 17.3033 6.21739ZM5.56414 6.21739C5.56414 6.47432 5.51353 6.72874 5.41521 6.96612C5.31688 7.20349 5.17277 7.41918 4.99109 7.60086C4.80941 7.78253 4.59372 7.92665 4.35635 8.02498C4.11897 8.1233 3.86455 8.17391 3.60762 8.17391C3.35069 8.17391 3.09627 8.1233 2.85889 8.02498C2.62152 7.92665 2.40583 7.78253 2.22415 7.60086C2.04247 7.41918 1.89835 7.20349 1.80003 6.96612C1.70171 6.72874 1.6511 6.47432 1.6511 6.21739C1.6511 5.69849 1.85723 5.20084 2.22415 4.83392C2.59107 4.467 3.08872 4.26087 3.60762 4.26087C4.12652 4.26087 4.62417 4.467 4.99109 4.83392C5.35801 5.20084 5.56414 5.69849 5.56414 6.21739Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Orders",
    path: "/admin/dashboard/orders",
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hover:text-[#4F80E1] fill-[#637381]"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.56 0.309091C3.71108 0.114514 3.94819 0 4.2 0H13.8C14.0518 0 14.2889 0.114514 14.44 0.309091L16.84 3.4C16.9439 3.53376 17 3.69644 17 3.86364V14.6818C17 15.2966 16.7471 15.8863 16.2971 16.321C15.847 16.7558 15.2365 17 14.6 17H3.4C2.76348 17 2.15303 16.7558 1.70294 16.321C1.25286 15.8863 1 15.2966 1 14.6818V3.86364C1 3.69644 1.05614 3.53376 1.16 3.4L3.56 0.309091ZM4.6 1.54545L2.6 4.12121V14.6818C2.6 14.8868 2.68429 15.0833 2.83431 15.2282C2.98434 15.3731 3.18783 15.4545 3.4 15.4545H14.6C14.8122 15.4545 15.0157 15.3731 15.1657 15.2282C15.3157 15.0833 15.4 14.8868 15.4 14.6818V4.12121L13.4 1.54545H4.6Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.5 4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5C16.5 4.91421 16.1642 5.25 15.75 5.25H2.25C1.83579 5.25 1.5 4.91421 1.5 4.5Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 6.75C6.41421 6.75 6.75 7.08579 6.75 7.5C6.75 8.09674 6.98705 8.66903 7.40901 9.09099C7.83097 9.51295 8.40326 9.75 9 9.75C9.59674 9.75 10.169 9.51295 10.591 9.09099C11.0129 8.66903 11.25 8.09674 11.25 7.5C11.25 7.08579 11.5858 6.75 12 6.75C12.4142 6.75 12.75 7.08579 12.75 7.5C12.75 8.49456 12.3549 9.44839 11.6517 10.1517C10.9484 10.8549 9.99456 11.25 9 11.25C8.00544 11.25 7.05161 10.8549 6.34835 10.1517C5.64509 9.44839 5.25 8.49456 5.25 7.5C5.25 7.08579 5.58579 6.75 6 6.75Z"
        />
      </svg>
    ),
  },
  {
    name: "Coupons",
    path: "/admin/dashboard/coupons",
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:fill-[#4F80E1] fill-[#637381]"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.5 3C1.5 2.58579 1.83579 2.25 2.25 2.25H15.75C16.1642 2.25 16.5 2.58579 16.5 3V15C16.5 15.4142 16.1642 15.75 15.75 15.75H2.25C1.83579 15.75 1.5 15.4142 1.5 15V3ZM3 4V14H15V4H3Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 6.75C6 6.33579 6.33579 6 6.75 6H11.25C11.6642 6 12 6.33579 12 6.75V11.25C12 11.6642 11.6642 12 11.25 12H6.75C6.33579 12 6 11.6642 6 11.25V6.75Z"
        />
      </svg>
    )
  }
];

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (location.pathname) {
      case "/admin/dashboard":
        return <DashboardHome />;
      case "/admin/dashboard/products":
        return <Products />;
      case "/admin/dashboard/customers":
        return <Customers />;
      case "/admin/dashboard/categories":
        return <Categories />;
      case "/admin/dashboard/orders":
        return <Orders />;
      case "/admin/dashboard/coupons":
        return <Coupons />;
      default:
        return null;
    }
  };

  async function handleLogoutClicked() {
    try {
        await axiosClient.post('/api/auth/logout');
        removeItem(KEY_ACCESS_TOKEN);
        navigate('/login')
      }catch (e){
        console.log(e);
      }
  }
  
  return (
    <div className="bg-[#F6F8FA] w-full nourd-text">
      <div className="w-full flex">
        <div className="bg-white sm:relative sm:flex sm:flex-col gap-2 sm:gap-16 rounded-br-xl h-screen min-h-[600px] py-6 absolute top-0 sm:left-0 left-0 overflow-y-auto px-5 w-48 overflow-hidden">
          <div className="flex gap-2 items-center relative z-30">
            <Link to="/">
              <img className="w-32 object-cover" src={Logo} alt="logo" />
            </Link>
          </div>

          <div className="flex flex-col gap-2.5 sm:justify-between items-start h-full mt-10 sm:mt-0">
            <div className="md:max-w-[234px]">
              {navigationList?.map((data, index) => (
                <Link to={data.path} key={index}>
                  <div className="flex gap-2.5 items-center cursor-pointer py-2 hover:text-[#4F80E1] rounded-md overflow-hidden justify-center sm:flex-row">
                    <div>{data?.svg}</div>
                    <span className="font-medium text-base hover:text-[#4F80E1] text-[#637381] block sm:hidden group-hover:block sm:group-hover:text-xs">
                      {data?.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-5">
              <div className="max-w-[234px]">
                <div className="flex gap-2.5 items-center cursor-pointer py-2 rounded-md group justify-center sm:flex-row">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:fill-[#4F80E1] fill-[#637381]"
                  >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.75 3C3.55109 3 3.36032 3.07902 3.21967 3.21967C3.07902 3.36032 3 3.55109 3 3.75V14.25C3 14.4489 3.07902 14.6397 3.21967 14.7803C3.36032 14.921 3.55109 15 3.75 15H6.75C7.16421 15 7.5 15.3358 7.5 15.75C7.5 16.1642 7.16421 16.5 6.75 16.5H3.75C3.15326 16.5 2.58097 16.2629 2.15901 15.841C1.73705 15.419 1.5 14.8467 1.5 14.25V3.75C1.5 3.15326 1.73705 2.58097 2.15901 2.15901C2.58097 1.73705 3.15326 1.5 3.75 1.5H6.75C7.16421 1.5 7.5 1.83579 7.5 2.25C7.5 2.66421 7.16421 3 6.75 3H3.75Z"
                  />
                  <path
                    d="M12 12.75L15.75 9L12 5.25"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 9C6 8.58579 6.33579 8.25 6.75 8.25H15.75C16.1642 8.25 16.5 8.58579 16.5 9C16.5 9.41421 16.1642 9.75 15.75 9.75H6.75C6.33579 9.75 6 9.41421 6 9Z"
                  />
                  </svg>
                  <span 
                    className="font-medium text-base text-[#637381] hover:text-[#4F80E1]"
                    onClick={handleLogoutClicked}
                  >
                    Log out
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col pl-48">
          <div className="w-full">
            <div className="bg-white flex-col gap-1 justify-between w-full col-span-12">
              {renderComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;