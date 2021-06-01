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

// Create a function that returns a grid componenent. Should take in a single prop called repos
function ReposGrid ({ repos }) {
    return (
        <ul>
            <pre> {JSON.stringify(repos, null, 2)} </pre> 
        </ul>
    )
}

// make a proptype for reposGrid. reposGrid should be an array and is required

ReposGrid.prototype = {
    repos: PropTypes.array.isRequired
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
                .then((data) => {
                    this.setState(({ repos }) => ({
                        repos: {
                            ...repos,
                            [selectedLanguage]: data
                        }
                    }))
                })
                .catch((error) => {
                    console.warn('Error fetching repos: ', error)

                    this.setState({
                        error: `There was an error fetching the repositories.`
                    })
                })
        }
    }

    isLoading() {
        // grab selectedLanguage repos and error from state
        const { selectedLanguage, repos, error } = this.state

        // check to see if repos at selected language is falsey and error is null 
        return !repos[selectedLanguage] && error === null
    }

    render() {

        const { selectedLanguage, repos, error } = this.state

        return (
            <React.Fragment>
                <Languages selected={selectedLanguage} onUpdateLanguage={this.updateLanguage} />

                {this.isLoading && <p>LOADING</p>}

                {error && <p>{error}</p>}

                // render reposGrid at the selected language
                {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}

            </React.Fragment>
        )
    }
}