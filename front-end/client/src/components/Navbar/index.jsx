import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { ClickAwayListener } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./styles.module.scss";
import logout from "../../utils/logout";

import Button from "../Modal/button";
import Modal, { ModalBody, ModalHeader } from "../Modal/modal";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const {
    subscriptionTypes,
    loadingSubscriptionTypes,
    logout: logoutSubscriptionTypes,
  } = useSelector((state) => state.subscriptionTypes);
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (logoutSubscriptionTypes) {
      dispatch({ type: "RESET" });
      logout(history);
    }
  }, []);
  const handlePaymentLink = async (subscriptionTypeId) => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    try {
      const link = await fetch(
        "http://localhost:5000/api/pay/subscription-types/" +
          subscriptionTypeId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      ).then((res) => res.json());
      console.log(link);
      if (link?.logout) return logout(history);
      else if (!link?.success)
        return alert(link?.error ?? "Error al intentar conseguir el pago");

      window.location.href = link.link;

      // console.log(link.link);
      // const newWindow = window.open(link.link, "_blank");
      // if (newWindow) newWindow.opener = null;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {/* <div className={styles.icon} onClick={() => history.goBack()}>
					<ArrowBackIosRoundedIcon />
				</div>
				<div className={styles.icon} onClick={() => history.goForward()}>
					<ArrowForwardIosRoundedIcon />
				</div> */}
      </div>
      <div className={styles.right}>
        <div>
          <Button onClick={() => setShowModal(true)}>
            <p>Unlimited</p>
          </Button>
          <Modal
            show={showModal}
            setShow={setShowModal}
            // hideCloseButton
          >
            <ModalHeader>
              <h2>Actualiza tu plan a premium!</h2>
            </ModalHeader>
            <ModalBody>
              {subscriptionTypes &&
                subscriptionTypes.map((type) => {
                  console.log(type);
                  return (
                    <div>
                      <h1>{type.name}</h1>
                      <h3>{type.description}</h3>
                      <h2>Beneficios:</h2>
                      {type.benefits.map((benefit) => {
                        return <h4>{benefit}</h4>;
                      })}

                      <Button onClick={() => handlePaymentLink(type._id)}>
                        <p>Pagar {Number(type.price).toFixed(2)} $ + ITBMS</p>
                      </Button>
                    </div>
                  );
                })}
            </ModalBody>
          </Modal>
        </div>

        <div
          style={{ backgroundColor: `${menu ? "#282828" : "#005678"}` }}
          className={styles.profile_menu}
          onClick={() => setMenu(!menu)}
        >
          <AccountCircleIcon />
          <p>Krlosz</p>
          {menu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>
      </div>
      {menu && (
        <ClickAwayListener onClickAway={() => setMenu(false)}>
          <div className={styles.menu} onClick={() => setMenu(false)}>
            <Link to="/me">
              <div className={styles.options}>
                <p>Profile</p>
                <PersonIcon />
              </div>
            </Link>
            <div className={styles.options}>
              <p>Settings</p>
              <SettingsIcon />
            </div>
            {/* <div className={styles.options}>
							<p>Logout</p>
							<LogoutIcon />
						</div> */}

            <div
              className={styles.options}
              onClick={() => {
                //close local session. still shoudl call server to tell token is invalid for 2 hours
                logout(history);
                alert("Cerrando sesion");
              }}
            >
              <p>Logout</p>
              <LogoutIcon />
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default Navbar;
