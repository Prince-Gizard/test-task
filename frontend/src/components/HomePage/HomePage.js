import React from 'react'
import styled from '@emotion/styled'

import useModal from 'use-react-modal'

import Spinner from '../shared/Spinner'
import UnstyledButton from '../shared/Button'
import UnstyledSearch from '../shared/Search'
import DatePicker from '../shared/DatePicker'
import ErrorText from '../shared/ErrorText'

import Article from './Article'
import NewArticleForm from './NewArticleForm'
import Paginator from '../shared/Paginator'

import useArticles from '../../hooks/useArticles'
import useHomePage from '../../hooks/useHomePage'

const ARTICLES_PER_PAGE = 6

const getDayAfter = (date) => {
  const dayAfter = new Date(date)
  dayAfter.setDate(dayAfter.getDate() + 1)
  return dayAfter
}

const useFilter = (articles, searchValue, startDate, endDate) => {
  const filter = () =>
    articles
      .filter((article) =>
        article.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      .filter((article) => !startDate || new Date(article.date) >= startDate)
      .filter(
        (article) => !endDate || new Date(article.date) <= getDayAfter(endDate)
      )

  return React.useMemo(filter, [articles, searchValue, startDate, endDate])
}

export default function HomePage() {
  const { isOpen: isModalOpen, openModal, closeModal, Modal } = useModal()

  const { articles: allArticles, status, error } = useArticles()
  const {
    pageIndex,
    setPageIndex,
    searchValue,
    setSearchValue,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useHomePage()

  const filteredArticles = useFilter(
    allArticles,
    searchValue,
    startDate,
    endDate
  )

  const articles = filteredArticles.slice(
    pageIndex * ARTICLES_PER_PAGE,
    (pageIndex + 1) * ARTICLES_PER_PAGE
  )

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE)

  React.useEffect(() => {
    if (pageIndex >= totalPages) {
      setPageIndex(Math.max(0, totalPages - 1))
    }
  }, [totalPages, pageIndex, setPageIndex])

  return (
    <>
      <Container>
        <Header>
          <Title>Статьи</Title>
          <Button onClick={openModal} disabled={status !== 'success'}>
            Создать статью
          </Button>
          <Search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Найти статью..."
          />
        </Header>
        <Body>
          <DatePicker
            text="Фильторвать по дате:"
            startDate={startDate}
            endDate={endDate}
            onChangeStartDate={setStartDate}
            onChangeEndDate={setEndDate}
          />
          <ArticlesContainer>
            {status === 'loading' ? (
              <Spinner />
            ) : status === 'error' ? (
              <ErrorText>{error}</ErrorText>
            ) : articles.length === 0 ? (
              <div>Статей не найдено</div>
            ) : (
              articles.map((article) => (
                <Article article={article} key={article.id}></Article>
              ))
            )}
          </ArticlesContainer>
        </Body>
        <Footer>
          {status === 'success' && totalPages > 0 && (
            <Paginator
              current={pageIndex}
              total={totalPages}
              shown={3}
              onChange={setPageIndex}
            />
          )}
        </Footer>
      </Container>
      {isModalOpen && (
        <Modal>
          <NewArticleForm onClose={closeModal} />
        </Modal>
      )}
    </>
  )
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  background: ${({ theme }) => theme.colors.primary};
  padding: 30px 0;
`

const Title = styled.h1`
  margin: 10px 10px 10px 60px;

  color: ${({ theme }) => theme.colors.textAccent};
  font-size: 55px;
  font-weight: lighter;
  font-family: ${({ theme }) => theme.fonts.heading};
`

const Button = styled(UnstyledButton)`
  margin: 10px 10px 10px 60px;
`

const Search = styled(UnstyledSearch)`
  margin: 10px 20px 10px 60px;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 80px;

  padding: 20px 20px 20px 20px;
`

const ArticlesContainer = styled.div`
  margin: 30px 0;
`

const Footer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;

  background: ${({ theme }) => theme.colors.alternative};
  padding: 20px;
`
