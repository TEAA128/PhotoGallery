/* eslint-disable import/extensions */
/* eslint-disable no-multi-spaces */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import SVG from 'react-inlinesvg';
import CloseForm from './airbnb-close-form.svg';
import SavePopupListItem from './SavePopupListItem.jsx';
import SavePopupForm from  './SavePopupForm.jsx';
import styles from '../styles/SavePopupList.css';

class SavePopupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };
    this.onCloseHandler = this.onCloseHandler.bind(this);
    this.onClickDetailHandler = this.onClickDetailHandler.bind(this);
    this.showCreateListForm = this.showCreateListForm.bind(this);
  }

  onCloseHandler() {
    const { closePopup } = this.props;
    closePopup();
  }

  onClickDetailHandler() {
    const { backToGalleryDetail } = this.props;
    backToGalleryDetail();
  }

  showCreateListForm() {
    const { showForm } = this.state;
    this.setState({ showForm: !showForm });
  }

  render() {
    const { showForm } = this.state;
    const { saveToList, saveStatus, likeStatusUpdate } = this.props;

    let form;
    if (showForm) {
      form = <SavePopupForm showCreateListForm={this.showCreateListForm} saveToList={saveToList} />;
    } else {
      form = <button className={styles.createNewListBtn} type="submit" onClick={this.showCreateListForm}>Create a new list</button>;
    }

    return (
      <div className={styles.savePopup}>
        <div className={styles.savePopupOutter} onClick={this.onClickDetailHandler}></div>
        <div className={styles.savePopupInner}>
          <div className={styles.closeFormBtnWrapper}>
            <button className={styles.closeFormBtn} type="submit" onClick={this.onCloseHandler}><SVG src={CloseForm} /></button>
          </div>
          <div className={styles.saveToListStl}>
            Save to a list
          </div>
          <div className={styles.saveToListBtnWrapper}>
            {form}
          </div>
          <div className={styles.shareContentContainer}>
            <table>
              <tbody>
                {saveStatus.map((item, index) => <SavePopupListItem item={item} key={index} likeStatusUpdate={likeStatusUpdate} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default SavePopupList;
