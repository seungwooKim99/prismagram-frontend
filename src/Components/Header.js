import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { ME } from "../sharedQueries"
import useInput from "../Hooks/useInput";
import Input from "./Input";
import { Compass, HeartEmpty, User, Logo } from "./Icons";
import { useQuery } from "react-apollo-hooks";



const Header = styled.header`
    ${props => props.theme.whiteBox}
    width: 100%;
    border: 0px;
    border-bottom: ${props => props.theme.boxBorder};
    border-radius: 0px;
    margin-bottom: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 0px;
    background-color: white;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    max-width: ${props => props.theme.maxWidth};
    display: flex;
    justify-content: center;
`;

const HeaderColumn = styled.div`
    width: 33%;
    text-align: center;
    &:first-child{
        margin-right: auto;
        text-align:left;
    }
    &:last-child{
        margin-left: auto;
        text-align:right;
    }
`;

const SearchInput = styled(Input)`
    background-color: ${props => props.theme.bgColor};
    padding: 5px;
    font-size: 14px;
    border-radius: 3px;
    height: auto;
    text-align: center;
    width: 80%;
    &::placeholder{
        opacity:0.8;
        font-weight:200;
    }
`;

const HeaderLink = styled(Link)`
    &:not(:last-child){
        margin-right: 30px;
    }
`;

export default withRouter(({ history }) => {
    const search = useInput("");
    const { data, loading } = useQuery(ME);
    const onSearchSubmit = (e) => {
        e.preventDefault();
        history.push(`/search?term=${search.value}`);
    };
    return (
        <Header>
            <HeaderWrapper>
                <HeaderColumn>
                    <Link to="/">
                        <Logo />
                    </Link>
                </HeaderColumn>
                <HeaderColumn>
                    <form onSubmit={onSearchSubmit}>
                        <SearchInput value={search.value} onChange={search.onChange} placeholder="Search" />
                    </form>
                </HeaderColumn>
                <HeaderColumn>
                    <HeaderLink to="/explore">
                        <Compass />
                    </HeaderLink>
                    <HeaderLink to="/notifications">
                        <HeartEmpty />
                    </HeaderLink>
                    {!(data && data.me) ? (<HeaderLink to="/#">
                        <User />
                    </HeaderLink>) : (<HeaderLink to={data.me.username}>
                        <User />
                    </HeaderLink>)}
                </HeaderColumn>
            </HeaderWrapper>
        </Header>
    );
});