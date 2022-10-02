import React from 'react'
import styled from '@emotion/styled'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import api from '../../api'

import Spinner from '../shared/Spinner'
import Button from '../shared/Button'
import Textarea from '../shared/Textarea'

import useArticles from '../../hooks/useArticles'

const schema = Yup.object().shape({
  title: Yup.string().required('Обязательное поле'),
  text: Yup.string().required('Обязательное поле'),
})

export default function NewArticleForm({ onClose }) {
  const { addArticle } = useArticles()

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const article = await api.postArticle(values)
      addArticle(article)
      setSubmitting(false)
      onClose()
    } catch (e) {
      setErrors({ submitError: e.message })
    }
  }

  return (
    <Container>
      <Title>Создать статью</Title>
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={handleSubmit}
        validationSchema={schema}
        on
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <FieldContainer>
              <Label>Название: </Label>
              <Field name="title" as={NameTextarea} />
              <ErrorMessage show={touched.title && errors.title}>
                {errors.title || 'invisible text'}
              </ErrorMessage>
            </FieldContainer>
            <FieldContainer>
              <Label>Текст: </Label>
              <Field name="text" as={TextTextarea} />
              <ErrorMessage show={touched.text && errors.text}>
                {errors.text || 'invisible text'}
              </ErrorMessage>
            </FieldContainer>

            <SubmitContainer>
              <SubmitButton type="submit" disabled={isSubmitting}>
                Отправить
              </SubmitButton>
              <Spinner size={30} loading={isSubmitting} />
              <ErrorMessage show={errors.submitError}>
                {errors.submitError || 'invisible text'}
              </ErrorMessage>
            </SubmitContainer>
            <CloseButton onClick={onClose}>Закрыть</CloseButton>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  width: 800px;
  max-width: 90vw;
  max-height: 90vh;

  padding: 20px 60px;
  overflow-y: auto;

  &:last-child::after {
    content: '';
    display: block;
    height: 20px;
  }
`

const Title = styled.h3`
  margin-bottom: 40px;

  text-align: center;
  font-size: 38px;
`

const FieldContainer = styled.div`
  margin-bottom: 20px;
`

const Label = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
`

const NameTextarea = styled(Textarea)`
  width: 100%;
  height: 70px;

  font-size: 20px;
`

const TextTextarea = styled(Textarea)`
  width: 100%;
  height: 200px;
  margin-bottom: 5px;

  font-size: 18px;
`

const ErrorMessage = styled.div`
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  color: ${({ theme }) => theme.colors.danger};
`

const SubmitButton = styled(Button)`
  width: 150px;
  margin-right: 15px;
`

const CloseButton = styled(Button)`
  width: 150px;
`

const SubmitContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`
