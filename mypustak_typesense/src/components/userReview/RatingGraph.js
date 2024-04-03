import React, { Component } from 'react';
import styles from "../../styles/RatingGraph.module.css";
class RatingGraph extends Component {



    render() {

        const { five_rating, four_rating, three_rating, two_rating, one_rating, total_rating, total_reviews } = this.props;
        const average_rating_calculate = () => {
            const { five_rating, four_rating, three_rating, two_rating, one_rating, total_rating, total_reviews } = this.props;

            let rate_mean = (5 * five_rating) + (4 * four_rating) + (3 * three_rating) + (2 * two_rating) + (1 * one_rating)
            rate_mean = rate_mean / total_rating
            return rate_mean.toFixed(2);
        }

        const calculte_percentage = (rating) => {
            let rating_per = rating / this.props.total_rating
            rating_per = rating_per * 100


            return rating_per
        }

        return (
            <div>
                <div className={styles.rating_mainDiv}>

                    <div className={styles.rating_title}>
                        <div className={styles.average_rating}>{average_rating_calculate()} &#9733;</div>
                        <div className={styles.rating_subtitle}>
                            {total_rating} {total_rating > 1 ? "Ratings" : "Rating"}<br /> {total_reviews} {total_reviews > 1 ? "Reviews" : "Review"}
                        </div>
                    </div>
                    <div>
                        <div className={styles.rating_text_graph}>
                            <div className={styles.rating_name}> 5 &#9733; </div>
                            <div className={styles.prog}>
                                <div id="filler" className={styles.filler} style={{ background: "#388e3c", width: `${calculte_percentage(five_rating)}%` }}>
                                </div>
                            </div>
                            <div><div >&nbsp;{five_rating}</div></div>
                        </div>
                        <div className={styles.rating_text_graph}>
                            <div className={styles.rating_name}> 4 &#9733; </div>
                            <div className={styles.prog}>
                                <div id="filler" className={styles.filler} style={{ background: "#388e3c", width: `${calculte_percentage(four_rating)}%` }}>
                                </div>
                            </div>
                            <div><div >&nbsp;{four_rating}</div></div>
                        </div>

                        <div className={styles.rating_text_graph}>
                            <div className={styles.rating_name}> 3 &#9733; </div>
                            <div className={styles.prog}>
                                <div id="filler" className={styles.filler} style={{ background: "#388e3c", width: `${calculte_percentage(three_rating)}%` }}>
                                </div>
                            </div>
                            <div><div >&nbsp;{three_rating}</div></div>
                        </div>

                        <div className={styles.rating_text_graph}>
                            <div className={styles.rating_name}> 2 &#9733; </div>
                            <div className={styles.prog}>
                                <div id="filler" className={styles.filler} style={{ background: "#ff9f00", width: `${calculte_percentage(two_rating)}%` }}>
                                </div>
                            </div>
                            <div><div >&nbsp;{two_rating}</div></div>
                        </div>

                        <div className={styles.rating_text_graph}>
                            <div className={styles.rating_name}> 1 &#9733; </div>
                            <div className={styles.prog}>
                                <div id="filler" className={styles.filler} style={{ background: "#ff6161", width: `${calculte_percentage(one_rating)}%` }}>
                                </div>
                            </div>
                            <div><div >&nbsp;{one_rating}</div></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RatingGraph;