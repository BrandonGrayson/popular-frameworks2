
import React from "react";
import { List, ListItem, Link, AspectRatio, Image, Heading, Box, Button, UnorderedList } from "@chakra-ui/react"
// proptypes package
import PropTypes from "prop-types";
// utils
import { fetchPopularRepos } from '../utils/fetchPopularRepos'
// react icons
import { FaUser, FaStar, FaCodeBranch, FaTriangle, FaExclamationTriangle } from "react-icons/fa"

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
function ReposGrid({ repos }) {
    return (
        <UnorderedList display='flex' justifyContent='space-around'>
            {/* <pre> {JSON.stringify(repos, null, 2)} </pre> */}
            {/* // map over all repos  */}
            {repos.map((repo, index) => {
                {/* destructure the necessary properties off the repo object*/ }
                const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
                // destructure necessary properties off owner object
                const { login, avatar_url, } = owner

                console.log(repo)

                return (
                    // make an li for each part of the card 
                    <Box display='flex' flexWrap='wrap' w='100%' >
                        <List key={html_url}>
                            <Heading fontSize='25px' fontWeight='300' m='20px'>
                                {/* value should be the index plus 1 */}
                            #{index + 1}
                            </Heading>

                            <AspectRatio w='200px' h='200px' ratio={4 / 4} borderRadius='3px' my='0' mx='auto' display='block'>
                                <Image src={avatar_url} />
                            </AspectRatio>

                            <Heading as='h2' textAlign='center'>
                                <Link color='rgb(187, 46, 31)' textDecoration='none' fontWeight='bold' href={html_url} > {login}</Link>
                            </Heading>

                            <List my='20px' mx='0' fontSize='20px'>
                                <ListItem>
                                    <FaUser style={{ color: 'rgb(255, 191, 116)' }} />
                                    <Link href={`https://www.github.com/${login}`} > {login} </Link>
                                </ListItem>
                            </List>

                            <ListItem>
                                <FaStar color='rgb(255, 215, 0)' />
                                {stargazers_count.toLocaleString()} stars
                            </ListItem>

                            <ListItem>
                                <FaCodeBranch color='rgb(129, 195, 245)' />
                                {forks.toLocaleString()} forks
                            </ListItem>

                            <ListItem>
                                <FaExclamationTriangle color='rgb(241, 138, 247)' />
                                {open_issues.toLocaleString()} open issues
                            </ListItem>
                        </List>
                    </Box>
                )
            })}

        </UnorderedList>
    )
}

// make a proptype for reposGrid. reposGrid should be an array and is required

ReposGrid.propTypes = {
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
                <Languages key={selectedLanguage} selected={selectedLanguage} onUpdateLanguage={this.updateLanguage} />

                {this.isLoading && <p>LOADING</p>}

                {error && <p>{error}</p>}


               
                {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
                
            </React.Fragment>
        )
    }
}