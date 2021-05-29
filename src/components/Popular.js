import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from "@chakra-ui/react"
// proptypes package
import PropTypes from "prop-types";
// utils
import { fetchPopularRepos } from '../utils/fetchPopularRepos'

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
            selectedLanguage: 'All',
            error: null,
            repos: {}
        }

        this.updateLanguage = this.updateLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)

    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }


    updateLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage,
            error: null,
        })

        if (!this.state.repos[selectedLanguage]) {
            fetchPopularRepos(selectedLanguage)
            .then(({ repos }) => ({
                repos: {
                    ...repos,
                    [ selectedLanguage ] : data
                }
            }))
            
            .catch(() => {
                console.warn("Err fetching repos", error)
    
                this.setState({
                    error: 'There was an error fetching Repos'
                })
            })
        }

    }



    isLoading() {
        return this.state.repos === null && this.state.error === null
    }

    render() {

        const { selectedLanguage, repos, error } = this.state

        return (
            <React.Fragment>
                <Languages selected={selectedLanguage} onUpdateLanguage={this.updateLanguage} />

                {this.isLoading && <p>LOADING</p>}

                {error && <p>{error}</p>}

                {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}

            </React.Fragment>
        )
    }
}