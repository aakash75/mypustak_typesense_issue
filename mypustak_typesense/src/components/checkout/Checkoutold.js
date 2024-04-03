// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { Button, Tabs } from '@mui/material';
// import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
// import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
// import PaymentsIcon from '@mui/icons-material/Payments';
// import { theme } from '../../styles/theme';
// import { styled } from '@mui/material/styles';
// const Anttabs = styled(Tabs)({
//     borderBottom: '1px solid #e8e8e8',
//     '& .MuiTabs-indicator': {
//         backgroundColor: '#1890ff',
//     },
// });


// export default function Checkout() {
//     const [value, setValue] = React.useState('1');

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     return (
//         <div className='container row'>
//             <Box sx={{ width: '100%', typography: 'body1' }} className='col-8 '>
//                 <TabContext value={value} >
//                     <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='' >
//                         <Anttabs onChange={handleChange} centered aria-label="lab API tabs example" className='bg '>

//                             <Tab label="Select Address" value="1" className='text-white' />
//                             <Tab label="Order Summary" value="2" className='text-white' />
//                             <Tab label="Payment" value="3" className='text-white' style={{}} />

//                         </Anttabs>

//                     </Box>
//                     <div className=''>
//                         <TabPanel value="1">Select Address</TabPanel>
//                         <TabPanel value="2">Order Summary</TabPanel>
//                         <TabPanel value="3">
//                             <div className='row'>
//                                 <div className='col-10 mx-auto px-3'>
//                                     <div className='heading d-flex justify-content-between text shadow-sm px-5'>
//                                         <p>Payment option</p>
//                                         <Button><ExpandMoreIcon /></Button>
//                                     </div>
//                                     <div className='row ml-4'>
//                                         <div className='col-5  '>
//                                             <table className="table table-borderless">
//                                                 <tbody>
//                                                     <tr><td><input class="form-check-input" type="checkbox" value="" id="" checked /></td>
//                                                         <td><AccountBalanceWalletOutlinedIcon className='text-primary' /></td>
//                                                         <td>Wallet Balance <br /> Balance 100</td></tr>
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                         <div className='col-5'>
//                                             <table class="table table-borderless">
//                                                 <tbody>
//                                                     <tr>
//                                                         <td><Button className='border border-danger w-100 bg text-white '>Recharge Wallet</Button></td>
//                                                     </tr>
//                                                 </tbody>
//                                             </table>
//                                         </div>

//                                     </div>
//                                     <div className='row ml-4'>
//                                         <div className='col-5 opacity-50'>
//                                             <table className="table table-borderless">
//                                                 <tbody>
//                                                     <tr><td><input className="form-check-input border border-primary" type="radio" name="flexRadioDefault" id="" /></td>
//                                                         <td className=''><WalletOutlinedIcon className='text-primary' /></td>
//                                                         <td>Prepaid</td></tr>
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </div>
//                                     <div className='row ml-4' style={{ backgroundColor: "#2258ae1a" }}>
//                                         <div className='col-5'>

//                                             <table className="table table-borderless">
//                                                 <tbody>
//                                                     <tr>
//                                                         <td><input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked /></td>
//                                                         <td><PaymentsIcon className='text-primary' /></td>
//                                                         <td>Cash On Delivery</td>
//                                                     </tr>
//                                                 </tbody>

//                                             </table>
//                                             <div className='ml-5 ' >
//                                                 <form className=''>



//                                                     <Button type='submit' className='d-block border border-danger text-white my-2' style={{ backgroundColor: "#098041" }}>Confirm Order</Button>

//                                                 </form>
//                                                 <p className='lh-1 opacity-75 w-100' style={{ fontSize: "0.8rem" }}>An extra charge of ₹50 is applicable for COD orders for shipment and handling books.</p>
//                                             </div>

//                                             <div></div>
//                                         </div>

//                                     </div>
//                                 </div>
//                             </div>
//                         </TabPanel>

//                     </div>
//                 </TabContext>
//             </Box>
//         </div>

//     );
// }


// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';


// const StyledTabs = styled((props) => (
//     <Tabs
//         {...props}
//         TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
//     />
// ))({
//     '& .MuiTabs-indicator': {
//         display: 'flex',
//         justifyContent: 'center',
//         backgroundColor: 'transparent',
//     },
//     '& .MuiTabs-indicatorSpan': {
//         maxWidth: 100,
//         width: '100%',
//         backgroundColor: 'white',
//         color:'red'
//     },
// });

// const StyledTab = styled((props) => <Tab  {...props} />)(
//     ({ theme }) => ({
//         textTransform: 'none',
//         fontWeight: theme.typography.fontWeightRegular,
//         fontSize: theme.typography.pxToRem(15),
//         marginRight: theme.spacing(1),
//         color: 'rgba(255, 255, 255, 0.7)',
//         '&.Mui-selected': {
//             color: '#fff',
//         },
//         '&.Mui-focusVisible': {
//             backgroundColor: 'rgba(100, 95, 228, 0.32)',
//         },
//     }),
// );

// export default function CustomizedTabs() {
//     const [value, setValue] = React.useState(0);

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     return (
//         <Box sx={{ width: '100%' }}>

//             <Box sx={{ bgcolor: '#2e1534', color: "red" }}>
//                 <StyledTabs
//                     value={value}
//                     onChange={handleChange}
//                     aria-label="styled tabs example"
//                 >
//                     <StyledTab label="Workflows" />
//                     <StyledTab label="Datasets" />
//                     <StyledTab label="Connections" />
//                 </StyledTabs>
//                 <Box sx={{ p: 3 }} />
//             </Box>
//         </Box>
//     );
// }

import Paymenttab from '../tabs/Paymenttab'
import React from 'react'


export default function Checkout() {
    return (
        <div>
            dkugoi
            <Paymenttab />
        </div>
    )
}


