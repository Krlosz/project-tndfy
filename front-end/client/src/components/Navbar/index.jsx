import { useState } from "react";
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
import Button from '../Modal/button';
import Modal, { ModalBody, ModalHeader } from '../Modal/modal';


const Navbar = () => {
	const [menu, setMenu] = useState(false);
	const history = useHistory();
	const [showModal, setShowModal] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div className={styles.icon} onClick={() => history.goBack()}>
					<ArrowBackIosRoundedIcon />
				</div>
				<div className={styles.icon} onClick={() => history.goForward()}>
					<ArrowForwardIosRoundedIcon />
				</div>
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
                    <h2>Modal header</h2>
                </ModalHeader>
                <ModalBody>
                    <span style={{ textAlign: 'justify' }}>
                        el modal
                    </span>
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
						<div className={styles.options}>
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
