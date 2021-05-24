import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from "@chakra-ui/react"

export default class Popular extends React.Component {
    render() {
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
        return (
                <List display='flex' flexDirection='row'>
                    {languages.map((language) => (
                        <ListItem >
                            <Button key={language}>
                                {language}
                            </Button>
                        </ListItem>
                    ))}
                </List>
        )
    }
}