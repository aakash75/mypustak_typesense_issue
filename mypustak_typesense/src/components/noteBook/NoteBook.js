import React, { Component } from 'react'
import styles from "../../styles/NoteBook.module.css";
import Image from "next/legacy/image";
import { fetch_notebook } from '../../redux/actions/notebookAction';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { url } from '../../helper/api_url';


class NoteBook extends Component {

  
}

const mapStateToProps = state => ({
  
});
export default connect(mapStateToProps, {
  fetch_notebook
})(withSnackbar(NoteBook));