import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from "@chakra-ui/react"
// proptypes package
import PropTypes from "prop-types";

function Languages({ selected, onUpdateLanguage }) {

    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']


    languages.propTypes = {
        selected: PropTypes.string.isRequired,
        onUpdateLanguage: PropTypes.func.isRequired
    }

    return (
        <List display='flex' flexDirection='row' justifyContent='center' w='100%' h='50%'>
            {languages.map((language) => (
                <>
                    <Button key={language} style={language === selected ? { color: 'rgb(187, 46, 31) ' } : null} onClick={() => onUpdateLanguage(language)} mr={2} key={language}>
                        {language}
                    </Button>
                </>
            ))}
        </List>
    )
}

export default class Popular extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: 'All'
        }

        this.updateLanguage = this.updateLanguage.bind(this)
    }

    updateLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage
        })
    }

    render() {
        
        const { selectedLanguage } = this.state
        
        return (
            <React.Fragment>
                <Languages selected={selectedLanguage} onUpdateLanguage={this.updateLanguage} />
            </React.Fragment>
        )
    }
}