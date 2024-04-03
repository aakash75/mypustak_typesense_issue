import React, { useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, FormControl, FormHelperText, InputAdornment, OutlinedInput, Tab, Tabs, TextField } from '@mui/material'

import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import torn_page from '../../assets/torn_page.svg'
import poor_binding from '../../assets/poor_binding.svg'
import moisture_damage from '../../assets/moisture_damage.svg'
import smoke_damage from '../../assets/smoke_damage.svg'
import missing_page from '../../assets/missing_page.svg'
import rough_book from '../../assets/rough_book.svg'
import stained_book from '../../assets/stained_book.svg'
import pirated_book from '../../assets/pirated_book.svg'
import magazine from '../../assets/magazine.svg'
import newspaper from '../../assets/newspaper.svg'
import corrected_book from '../../assets/corrected_book.svg'
import course_book from '../../assets/course_book.svg'
import audio_book from '../../assets/audio_book.svg'
import porn_material from '../../assets/porn_material.svg'
import too_old_book from '../../assets/too_old_book.svg'
import Image from "next/legacy/image";

const book_types = [
    {
        key: 1,
        image: torn_page,
        title: 'Torn Pages'
    },
    {
        key: 2,
        image: poor_binding,
        title: 'Extremely poor binding'
    },
    {
        key: 3,
        image: moisture_damage,
        title: 'Water, Moisture Or Mould Damage'
    },
    {
        key: 4,
        image: smoke_damage,
        title: 'Burnt or smoke damaged'
    },
    {
        key: 5,
        image: missing_page,
        title: 'Missing Pages'
    },
    {
        key: 6,
        image: rough_book,
        title: 'Books with rough work'
    },
    {
        key: 7,
        image: stained_book,
        title: 'Stained'
    },
    {
        key: 8,
        image: pirated_book,
        title: 'Pirated Books'
    },
    {
        key: 9,
        image: magazine,
        title: 'Magazines'
    },
    {
        key: 10,
        image: newspaper,
        title: 'News papers'
    },
    {
        key: 11,
        image: corrected_book,
        title: 'Corrected Or Uncorrected Proof Copies Of Books'
    },
    {
        key: 12,
        image: course_book,
        title: 'Course Materials of College'
    },
    {
        key: 13,
        image: audio_book,
        title: 'Audio Books on CD'
    },
    {
        key: 14,
        image: porn_material,
        title: 'Porn Material'
    },
    {
        key: 15,
        image: too_old_book,
        title: 'Too old or out of syllabus textbooks.'
    },
]

function DonationForm() {

    const [value, setValue] = useState('1');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = event => {
        event.preventDefault(); // 👈️ prevent page refresh

        // 👇️ access input values here
        console.log('firstName ', firstName);
        console.log('lastName ', lastName);

        // 👇️ clear all input values in the form
        setFirstName('');
        setLastName('');
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='mx-3 row '>
            <div className='col-12 col-sm-6 col-lg-5 px-4 '>
                <div className='  border border-gray'>
                    <h5 className='text-center text-color bold m-0 my-3'><b>Book Condition Guidelines</b></h5>
                </div>
                <div className='border border-gray py-3 px-2 mt-3'>
                    <p className='lh-sm details-color' style={{ fontSize: '0.9rem' }}>We request you to donate books that are in good condition, the books which you will prefer for yourself. The team puts great effort to make your valuable books reach in the right hands. All these efforts will not be fruitful if you don&apos;t follow the book condition guidelines. If the books match the guidelines we are committed to carry your emotions forward with the books to the next reader and make them grow older!</p>
                    <p><b>Following that MyPustak team requests you to avoid sending books with</b></p>
                    <div className='row'>
                        {book_types.map((data) => (
                            <>
                                <div key={data.key} className='col-4 text-center'>
                                    <Image src={data.image} alt='bk_cond_img' />
                                    <p className='details-color lh-1' style={{ fontSize: '0.8rem' }}>{data.title}</p>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>


            <div className='col-12 col-sm-6 col-lg-7 '>
                <Box sx={{ width: '100%' }} >
                    <TabContext value={value} >
                        <Box className='border border-gray pt-2'>
                            <TabList variant="fullWidth">
                                <Tab label={<><span><LooksOneOutlinedIcon className='fs-4 bg-primary text-white' /> <b className='text-nowrap' >Order Details</b> </span></>} value="1" />
                                <Tab label={<><span><LooksTwoOutlinedIcon className='fs-4 bg-primary text-white ' /> <b className='text-nowrap'>Book Details</b> </span></>} value="2" />
                                <Tab label={<><span><Looks3OutlinedIcon className='fs-4 bg-primary text-white ' /> <b className='text-nowrap'>Review</b> </span></>} value="3" />
                            </TabList>
                        </Box>

                        <TabPanel value="1" className='p-2 border border-gray' >
                            <form onSubmit={handleSubmit} method='POST' >

                                <div className='row'>
                                    <p className='col-12 col-lg-6'>
                                        <TextField name='first_name' value={firstName} className='text-center w-100' type='text' onChange={event => setFirstName(event.target.value)} id="standard-basic" label="First Name*" variant="standard" /></p>
                                    <p className='col-12 col-lg-6'>
                                        <TextField name='last_name' value={lastName} className='text-center w-100' type='text' onChange={event => setLastName(event.target.value)} id="standard-basic" label="Last Name*" variant="standard" />
                                    </p>
                                </div>

                                <div className='row'>
                                    <p className='col-12 col-lg-6 '>
                                        <TextField name='pincode' className='text-center w-100' label='Pincode*' type='tel' variant='standard' />
                                    </p></div>

                                <div className='row'>
                                    <p className='col-12 col-lg-6'>
                                        <TextField name='number' className='text-center w-100' label='10 digit mobile number*' type='tel' variant='standard' />
                                    </p>
                                    <p className='col-12 col-lg-6'>
                                        <TextField name="phone" className='text-center w-100' label=' Whatsapp number*' type='tel' variant='standard' />
                                    </p>
                                </div>

                                <div className='row'>
                                    <p className='col-12 col-lg-6'>
                                        <TextField name='address' className='text-center w-100' label='Pickup address (Area & street)*' type='text' variant='standard' />
                                    </p>
                                    <p className='col-12 col-lg-6'>
                                        <TextField name='landmark' className='text-center w-100' label='Landmark ' type='text' variant='standard' />
                                    </p>
                                </div>

                                <div className='row'>
                                    <p className='col-12 col-lg-6'>
                                        <TextField name='state' className='text-center w-100' label='Select State*' type='text' variant='standard' />
                                    </p>
                                    <p className='col-12 col-lg-6'>
                                        <TextField name='district' className='text-center w-100' label='City/ District/ Town*' type='text' variant='standard' />
                                    </p>
                                </div>
                                <div className='mb-2'><Button fullWidth type='submit' className='bg text-white ' onClick={() => setValue("2")}>Next</Button></div>
                            </form>

                        </TabPanel>

                        <TabPanel value="2" className='p-2 border border-gray'>
                            <form>

                                <div className='row'>
                                    <p className='col-12 col-lg-6'>
                                        <TextField name='number_of_books' className='text-center w-100' label='Approx No. of Books*' type='tel' variant='standard' />
                                    </p>
                                    <p className='col-12 col-lg-6'>
                                        <TextField name='landmark' className='text-center w-100' label='Landmark *' type='text' variant='standard' />

                                    </p>
                                </div>
                                <div className='row'>
                                    <p className='col-12 col-lg-6'>
                                        <TextField name='weight' className='text-center w-100' label='Total Weight in kg' type='tel' variant='standard' />
                                    </p>
                                </div>
                                <div className='row'>
                                    <div className='col-12 col-lg-6'>
                                        <p>Select most suitable books categories</p>
                                    </div>
                                    <div className='col-12 col-lg-6'>
                                        <p className='text-danger mb-0' style={{ fontSize: "0.7rem" }}>(*We donot accept any books which are used for internal circulation purpose)</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12 col-lg-6'>
                                        <div className='row mx-auto'>
                                            <div className="form-check col-6">
                                                <input className="form-check-input " type="checkbox" value="" id="flexCheckDefault1" />
                                                <label className="form-check-label " htmlFor="flexCheckDefault1">
                                                    Ncert
                                                </label>
                                            </div>
                                            <div className="form-check col-6">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                    School
                                                </label>
                                            </div>
                                        </div>
                                        <div className='row mx-auto'>
                                            <div className="form-check col-6">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault3" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault3">
                                                    MBA
                                                </label>
                                            </div>
                                            <div className="form-check col-6">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault4" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault4">
                                                    Spiritual books
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-12 col-lg-6'>
                                        <div className='row mx-auto'>
                                            <div className="form-check col-6">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault5" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault5">
                                                    Entrance Exam
                                                </label>
                                            </div>
                                            <div className="form-check col-6">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault6" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault6">
                                                    Children
                                                </label>
                                            </div>
                                        </div>
                                        <div className='row mx-auto'>
                                            <div className="form-check col-6">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault7" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault7">
                                                    Others
                                                </label>
                                            </div>
                                            <div className="form-check col-6">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault8" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault8">
                                                    Engineering
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-6'>
                                        <Button fullWidth className=' previous_btn_bg text-white' onClick={() => setValue("1")}>Previous</Button>
                                    </div>
                                    <div className='col-6'>
                                        <Button fullWidth className=' bg-color text-white' onClick={() => setValue("3")}>Next</Button>
                                    </div>
                                </div>
                            </form>

                        </TabPanel>
                        <TabPanel value="3" className='p-2 border border-gray'>
                            <form className='p-3'>
                                <div className='row '>
                                    <div className='col-lg-6'>
                                        <div className='pb-3'>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <span className='text-color'><b>Name</b></span>
                                                </div>
                                                <div className='text-danger opacity-75'>Change</div>
                                            </div>
                                            <small className='details-color'>Anamika Jha</small>
                                        </div>
                                        <div className='pb-3'>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <span className='text-color'><b>Pin</b></span>
                                                </div>
                                                <div className='text-danger opacity-75'>Change</div>
                                            </div>
                                            <small className='details-color'>700036</small>
                                        </div>
                                        <div className='pb-3'>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <span className='text-color'><b>Phone no.</b></span>
                                                </div>
                                                <div className='text-danger opacity-75'>Change</div>
                                            </div>
                                            <small className='details-color'>7044523689</small>
                                        </div>
                                        <div className='pb-3'>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <span className='text-color'><b>Whatsapp no.</b></span>
                                                </div>
                                                <div className='text-danger opacity-75'>Change</div>
                                            </div>
                                            <small className='details-color'>7044523689</small>
                                        </div>
                                        <div className='pb-3'>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <span className='text-color'><b>Address</b></span>
                                                </div>
                                                <div className='text-danger opacity-75'>Change</div>
                                            </div>
                                            <small className='details-color '>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</small>
                                        </div>
                                        <div className='pb-3'>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <span className='text-color'><b>Book Categories</b></span>
                                                </div>
                                                <div className='text-danger opacity-75'>Change</div>
                                            </div>
                                            <small className='details-color'>MBA &nbsp;&nbsp;&nbsp; School &nbsp;&nbsp;&nbsp; Spiritual</small>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='pb-3'>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <span className='text-color'><b>Landmark</b></span>
                                                </div>
                                                <div className='text-danger opacity-75'>Change</div>
                                            </div>
                                            <small className='details-color'>Torquent per conubia nostra, per inceptos himenus</small>

                                        </div>
                                        <div className='pb-3'>
                                            <div className='d-flex justify-content-between'>
                                                <div >
                                                    <span className='text-color'><b>State</b></span>
                                                </div>
                                                <div className='text-danger opacity-75'>Change</div>
                                            </div>
                                            <small className='details-color'>Uttar Pradesh</small>
                                        </div>
                                        <div className='pb-3'>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <span className='text-color'><b>Approx No. of books</b></span>
                                                </div>
                                                <div className='text-danger opacity-75'>Change</div>
                                            </div>
                                            <small className='details-color'>20</small>
                                        </div>
                                        <div className='pb-3'>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <span className='text-color'><b>City/District/Town</b></span>
                                                </div>
                                                <div className='text-danger opacity-75'>Change</div>
                                            </div>
                                            <small className='details-color'> per inceptos himenus</small>

                                        </div>
                                        <div className='pb-3'>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <span className='text-color'><b>No. of carton/boxes</b></span>
                                                </div>
                                                <div className='text-danger opacity-75'>Change</div>
                                            </div>
                                            <small className='details-color'> 8</small>

                                        </div>
                                        <div className='pb-3'>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <span className='text-color'><b>Total weight</b></span>
                                                </div>
                                                <div className='text-danger opacity-75'>Change</div>
                                            </div>
                                            <small className='details-color'> 20 kg</small>

                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-6'><Button fullWidth className='bg-color text-white' onClick={() => setValue("2")}>Previous</Button></div>
                                    <div className='col-6'><Button fullWidth className='bg-color text-white' >Next</Button></div>
                                </div>
                            </form>

                        </TabPanel>
                    </TabContext >
                </Box >
            </div >

        </div >
    )
}

export default DonationForm




