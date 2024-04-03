import Image from "next/legacy/image"
import React from 'react'
import donation_box from '../../assets/donation_box.svg'
import doubtful_user from '../../assets/doubtful_user.svg'

function BookConditionGuidelines() {
    return (
        <div className='container-fluid mt-3 px-lg-5 px-md-5 px-sm-5 '>
            <div className='row mb-5 bg-white'>
                <div className='col-12'>
                    <h5 className='py-3 bg-color text-white text-center'>Book Condition Guidelines</h5>
                    <p className='my-4 details-color lh-sm'>We request you to donate books that are in good condition, the books which you will prefer for yourself. The team puts great effort to make your valuable books reach in the right hands. All these efforts will not be fruitful if you don&apos;t follow the book condition guidelines. If the books match the guidelines we are committed to carry your emotions forward with the books to the next reader and make them grow older!</p></div>
                <div className='row  p-3 m-0'>
                    <div className='col-12 col-lg-6 px-0 '>
                        <div className='position-relative'>
                            <div className='py-4 pl-4'>
                                <ul className=' text-color' style={{ paddingLeft: "0px" }}>Following that MyPustak team requests, you avoid sending books containing the below remark -</ul>
                                <div className='pl-3'>
                                    <li>Extremely poor binding.</li>
                                    <li>Study material used for internal circulation, ICAI, ICSI books</li>
                                    <li>Torn Pages, Missing Pages quality, not upto the mark</li>
                                    <li>Torn Front and Back Cover</li>
                                    <li>Water, Moisture Or Mould Damage</li>
                                    <li>Burnt or smoke damaged.</li>
                                    <li>Stained</li>
                                    <li>Books with too much rough work on them.</li>
                                    <li>Corrected Or Uncorrected Proof Copies Of Books</li>
                                    <li>Pirated Or Photocopied Books</li>
                                    <li>Newspapers</li>
                                    <li>Audio Books on CD.</li>
                                    <li>Course Materials of Universities/College</li>
                                    <li>Too old or out of syllabus textbooks.</li>
                                    <li>Magazines/Newspapers</li>
                                    <li>Porn Material</li>
                                </div>
                            </div>
                            <div className='d-none d-sm-flex position-absolute bottom-0 end-0 mb-5'>
                                <Image src={doubtful_user} className="" alt='person_img' height={150} width={150} />
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-lg-6 d-flex align-items-end'>
                        <Image src={donation_box} className='' alt='box_img' />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BookConditionGuidelines