import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import _ from 'lodash';

const TextWindow = ({ article, loading }) => {
	return (
		<Panel>
			<Panel.Body>
				{
					_.isEmpty(article.sentences) || loading ?
						<div className="loader"></div> :
						<div style={{maxHeight: "300px", overflowY: "auto"}}>
							{
								article.sentences.map(sentence => {
									return <p>{sentence}</p>
								})
							}
						</div>
				}
			</Panel.Body>
		</Panel>
	);
}

TextWindow.propTypes = {
	article: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired
};

export default TextWindow;
