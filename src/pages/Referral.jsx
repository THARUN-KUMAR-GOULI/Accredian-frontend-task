import { faFacebook, faInstagramSquare, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFilePen, faGraduationCap, faHeadset, faToggleOn, faUserPlus, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from "axios";
import React, { useState } from 'react';
import { TailSpin } from "react-loader-spinner";
import process from "../images/heroslider.jpg";
import photo from "../images/photo.jpg";
import "./Referal.css";



const Referral = () => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        number: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setloading] = useState(false);

    const programmnames = ["All Programms", "Product Management", "Bussiness Management", "Strategy & Leadership", "Fintech", "Senior Management", "Data science", "Digital Transformation", "Bussiness Analytics"];

    const footerprogram = ["Data Science & AI", "Product Management", "Bussiness Analytics", "Digital Transforamtion", "Bussiness Management", "Project Management", "Strategy & Leadership", "Fintech"]

    const referraldata = [
        { program: "Professional Certificate Program in Product Management", referralbonus: "Rs. 7,000", referredbonus: "Rs. 9,000" },
        { program: "Professional Certificate Program in \n Product Management", referralbonus: "Rs. 7,000", referredbonus: "Rs. 9,000" },
        { program: "Professional Certificate Program in \n Product Management", referralbonus: "Rs. 7,000", referredbonus: "Rs. 9,000" },
        { program: "Professional Certificate Program in \n Product Management", referralbonus: "Rs. 7,000", referredbonus: "Rs. 9,000" },
        { program: "Professional Certificate Program in \n Product Management", referralbonus: "Rs. 7,000", referredbonus: "Rs. 9,000" },
        { program: "Professional Certificate Program in \n Product Management", referralbonus: "Rs. 7,000", referredbonus: "Rs. 9,000" },
        { program: "Professional Certificate Program in \n Product Management", referralbonus: "Rs. 7,000", referredbonus: "Rs. 9,000" }
    ];

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = form.name ? "" : "This field is required.";
        tempErrors.email = form.email ? "" : "This field is required.";
        tempErrors.number = form.number ? "" : "This field is required.";

        if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
            tempErrors.email = "Email is not valid.";
            // console.log("Email is in correct format ");
        }

        if (form.number && !/^\d{10}$/.test(form.number)) {
            tempErrors.number = "Phone number is not valid.";
            // console.log("Number is in correct format ");
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).every(x => tempErrors[x] === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setloading(true);
            axios.post('http://localhost:3001/api/referral', form)
                .then(response => {
                    console.log(response.data);
                    alert("Referral submitted successfully, check email !");
                    setForm({ name: '', email: '', number: '' })
                    setOpen(false);
                })
                .catch(error => {
                    console.log("Error submitting the form", error);
                })
                .finally(() => {
                    setloading(false);
                })

        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <header className='header'>
                <div className="text">
                    <p><span className="text-top">accredian</span> <br /> <span className="text-bottom">Credentials matter</span></p>

                    <select defaultValue="" displayEmpty>
                        <option value="">
                            Courses
                        </option>
                        <option>
                            IT
                        </option>
                        <option>
                            Non-IT
                        </option >
                        <option >
                            Others
                        </option>
                    </select>
                </div>


                <div className="right-section">
                    <p>Refer & Earn</p>
                    <p>Resources</p>
                    <p>About Us</p>
                    <button className="login-btn">Login</button>
                    <button className="tryforfree-btn">Try for free</button>
                </div>
            </header>

            <div className="nav-links">
                <p>Refer</p>
                <p>Benefits</p>
                <p>FAQs</p>
                <p>Support</p>
            </div>


            <div className='mid'>
                <div className="heroSection">
                    <div className="heroText">
                        <h1>Let's Learn & Earn</h1>
                        <p>Get a chance to win up-to <br /><span style={{ color: "blue", fontSize: "25px" }}>Rs. 15,000</span></p>
                        <Button variant="contained" color="primary" className="referButton" onClick={handleClickOpen}>
                            Refer
                        </Button>
                    </div>
                    <div className="heroImage">
                        <img src={photo} className="bcg-img" alt="Referral" />

                    </div>
                </div>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Referral Form</DialogTitle>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                name="name"
                                label="Name"
                                fullWidth
                                value={form.name}
                                onChange={handleChange}
                                {...(errors.name && { error: true, helperText: errors.name })}
                            />
                            <TextField
                                margin="dense"
                                name="email"
                                label="Email"
                                type="email"
                                fullWidth
                                value={form.email}
                                onChange={handleChange}
                                {...(errors.email && { error: true, helperText: errors.email })}
                            />
                            <TextField
                                margin="dense"
                                name="number"
                                label="Phone Number"
                                fullWidth
                                value={form.number}
                                onChange={handleChange}
                                {...(errors.number && { error: true, helperText: errors.number })}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                {loading && (
                    <div className="loader">
                        <TailSpin color="#00BFFF" height={80} width={80} />
                    </div>
                )}
            </div>


            <div className="process">
                <h3>How Do I <span style={{ color: 'blue' }}>Refer</span></h3>
                <img src={process} className='process-img' alt='process-img' />
                <div className="overlay-text overlaytext-1">
                    <FontAwesomeIcon className="refer-user-icon" icon={faUserPlus} />
                    <p>submit referrals <br /> easily via our website <br /> referral section</p>
                </div>
                <div className="overlay-text overlaytext-2">
                    <FontAwesomeIcon className="refer-user-icon" icon={faFilePen} />
                    <p >Earn Rewards once<br /> referre joins an <br /> Accredian program</p>
                </div>
                <div className="overlay-text overlaytext-3">
                    <FontAwesomeIcon className="refer-user-icon" icon={faWallet} />
                    <p>Both parties receive <br /> a bonus 30 days<br /> after enrollment</p>
                </div>
                <Button variant="contained" color="primary" className="referButton" onClick={handleClickOpen}>
                    Refer
                </Button>
            </div>


            <div className="program-section">

                <h3>What are the <span style={{ color: "blue" }}>Referral Benefits?</span></h3>
                <span className='toggle'>Enrolled <FontAwesomeIcon icon={faToggleOn} /></span>

                <div className="programs">

                    <div className="left-program">
                        {programmnames.map((name, index) => (
                            <div key={index} className="list-item">

                                <p className="name">{name}</p>
                                <p className="greater-than">{">"}</p>

                            </div>
                        ))}
                    </div>

                    <div className="right-program">
                        <table>
                            <thead>
                                <tr>
                                    <th>Programs</th>
                                    <th>Referral Bonus</th>
                                    <th>Referred Bonus</th>
                                </tr>
                            </thead>

                            <tbody>
                                {referraldata.map((programitem, index) => (
                                    <tr key={index}>

                                        <td className='program-name'><FontAwesomeIcon icon={faGraduationCap} className="graduation-cap" />{programitem.program}</td>
                                        <td className="referralbonus">{programitem.referralbonus}</td>
                                        <td className="referredbonus">{programitem.referredbonus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Button variant="contained" color="primary" className="programsection-btn" onClick={handleClickOpen}>
                    Refer
                </Button>
            </div>


            <div className="faq">
                <h4>Frequently Asked <span style={{ color: "blue" }}>Questions</span></h4>

                <div className="faq-data">
                    <div className="faq-left">
                        <p className='with-shadow'>Eligibility</p>
                        <p>How to use ?</p>
                        <p>Terms & Conditions</p>
                    </div>
                    <div className="faq-right">
                        <p>Do I need to have Product Management experience to enroll in the Program ?</p>
                        <p>No, the program is designed to be incluse of all levels of experience. All topics will be covered from the basic.</p>
                        <p>What is the minimum system configuration requierd ?</p>
                    </div>
                </div>
            </div>

            <div className="get-touch">
                <div className="touch-left">
                    <FontAwesomeIcon className="headset-icon" icon={faHeadset} />
                    <span><span>Want to delve deeper into the program ?</span><br /><span>Share your details to receive expert insights.</span></span>
                </div>
                <div className="touch-right">
                    <button>Get in touch {">"}</button>
                </div>
            </div>


            <footer>
                <div className="foot">
                    <div className="footer-top">
                        <p><span>accredian </span><br /> <span style={{ fontSize: "10px" }}>Credentials matter</span></p>
                        <button>Schedule 1-on-1 Call now</button>
                    </div>

                    <hr style={{ backgroundColor: "black", height: "2px" }} />

                    <div className="footer-bottom">

                        <div className="left">
                            <p>Program</p>
                            {footerprogram.map((name, index) => (
                                <p><span>{name}</span><span>{"+"}</span></p>
                            ))}
                        </div>

                        <div className="middle">
                            <h3>Contact Us</h3>
                            <p>Office Address : 4th floor, 250, phase IV, sector 18, Gurugram, Haryana, 122015.</p>
                            <p>Why Accredian ?</p>
                            <p>Follow Us</p>
                            <span><FontAwesomeIcon className='icon' icon={faFacebook} /><FontAwesomeIcon className='icon' icon={faLinkedin} /><FontAwesomeIcon className='icon' icon={faInstagramSquare} /><FontAwesomeIcon className='icon' icon={faTwitter} /></span>
                        </div>

                        <div className="right">
                            <h4>Accredian</h4>
                            <p>About</p>
                            <p>Career</p>
                            <p>Blog</p>
                            <p>Admission POlicy</p>
                            <p>Referral Policy</p>
                            <p>Terms & Conditions</p>
                        </div>
                    </div>
                </div>
            </footer>


        </div>
    );
};

export default Referral;
