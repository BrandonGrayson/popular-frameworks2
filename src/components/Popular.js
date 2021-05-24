import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from "@chakra-ui/react"

export default class Popular extends React.Component {
    render() {
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
        return (
                <List display='flex' flexDirection='row' justifyContent='center' w='100%' h='50%'>
                    {languages.map((language) => (
                        <ListItem>
                            <Button mr={2} key={language}>
                                {language}
                            </Button>
                        </ListItem>
                    ))}
                </List>
        )
    }
}