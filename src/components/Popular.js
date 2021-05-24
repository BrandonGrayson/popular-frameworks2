import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from "@chakra-ui/react"

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
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
        return (
            <List display='flex' flexDirection='row' justifyContent='center' w='100%' h='50%'>
                {languages.map((language) => (
                    <ListItem>
                        <Button style={language === this.state.selectedLanguage ? {color: 'rgb(187, 46, 31) ' } : null } onClick={() => this.updateLanguage(language)} mr={2} key={language}>
                            {language}
                        </Button>
                    </ListItem>
                ))}
            </List>
        )
    }
}