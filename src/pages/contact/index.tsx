import Head from 'next/head';
import { Page } from 'modules';
import { Button, FluidContainer, Input, Select, Typography } from 'components';
import styled from 'styled-components';
import contacts from 'data/contacts.json';
import { FontSizes, Spaces } from 'theme';
import { useState, ChangeEvent, FormEvent } from 'react';
import { TextArea } from 'components/TextArea';
import { categoryItems, CategoryOption } from 'types/CategoriesContact';
import { postJotform } from 'api';
import { useToast } from 'context/ToastContext';
import { ContactFormData } from 'types/Contact';

const ContactGrid = styled(FluidContainer)`
  width: 100%;
  gap: ${Spaces.xl};

  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
    align-items: start; // vertical alignment of items
    /* no justify-content: space-between here */
  }
`;

const Card = styled.div<{ color?: string; shadow?: boolean }>`
  background: ${(p) => p.color ?? 'white'};
  border-radius: 12px;
  padding: ${Spaces.xl};
  box-shadow: ${(p) => (p.shadow ? '0 2px 8px rgba(0,0,0,.1)' : 'none')};
`;

const ContactContainer = styled.div`
  width: 100%;
  max-width: 420px;
`;

const ContactItem = styled.div`
  margin-bottom: ${Spaces.lg};
`;

const FormGroup = styled.div`
  margin-bottom: ${Spaces.lg};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${Spaces.md};
  margin-bottom: ${Spaces.lg};

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

const ErrorText = styled.span`
  color: #dc2626;
  font-size: 14px;
  margin-top: ${Spaces.xs};
  display: block;
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${Spaces.xs};
  font-weight: 400;
  font-size: ${FontSizes.xs};
`;

const RequiredMark = styled.span`
  color: #dc2626; /* or Colors.red if in your theme */
`;

interface FormErrors {
  subject?: string;
  category?: string;
  email?: string;
  message?: string;
  firstName?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    subject: '',
    category: '',
    email: '',
    message: '',
    firstName: '',
    lastInitial: '',
  });
  const { showToast } = useToast();

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicEmailRegex.test(email)) return false;

    return email.toLowerCase().endsWith('@calstatela.edu');
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid Cal State LA email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.category || formData.category.trim() === '') {
      newErrors.category = 'Please choose a category.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value as CategoryOption }));
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await postJotform(formData);

      showToast('Your response has been successfully sent!', 'success');

      // Reset form
      setFormData({
        firstName: '',
        lastInitial: '',
        email: '',
        subject: '',
        category: '',
        message: '',
      });
    } catch (error: any) {
      const message = String(error?.message || '');

      showToast(
        message.includes('Too many') || message.includes('maximum')
          ? 'You have reached the maximum number of submission attempts. Please try again later.'
          : 'Error: Your response has not been successfully sent.',
        'error',
      );

      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      <Head>
        <title>Contact the U-SU</title>
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Organizations, Cross Cultural Centers, Center For Student Involvement, Fitness Center, Student Orgnizations, Calendar, Events, Gender and Sexuality Resource Center, Pan African Resource Center, Asian Pacific Islander, Chicana Latina, Information and Event Services, Distinguished Women Awards, Cultural Graduate Celebrations, Employment Opportunities, Board of Directors, Jobs"
          key="keywords"
        />
        <meta
          name="description"
          content="The University-Student Union inc.(U-SU) at California State University, Los Angeles was established in 1975 and provides a unique setting for the encouragement of broad social, cultural, recreational, and informal educational programming for the university and its surroundings."
          key="description"
        />
      </Head>

      <FluidContainer backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-2.webp">
        <Typography variant="titleLarge" weight="700" as="h1">
          Contact Us
        </Typography>
        <Typography as="p">
          Share feedback, report an issue, or ask a question.
        </Typography>
      </FluidContainer>
      <FluidContainer
        flex
        justifyContent="flex-start"
        flexWrap="wrap"
        flexDirection="row"
        backgroundColor="greyLightest"
      >
        <ContactGrid as="section">
          <Card as="aside" color="greyLighter">
            <Typography weight="700" as="h2">
              University-Student Union
            </Typography>
            <address style={{ fontStyle: 'normal', marginTop: Spaces.lg }}>
              <Typography as="p">5154 State University Dr</Typography>
              <Typography as="p">Los Angeles, CA 90032</Typography>
            </address>

            <ContactContainer style={{ marginTop: Spaces.xl }}>
              {contacts.map((c) => (
                <ContactItem key={c.office}>
                  <Typography weight="700">{c.office}</Typography>
                  {c.tel.map((t, i) => (
                    <Typography as="p" key={`${c.office}-${i}`}>
                      <a href={`tel:${t.replace(/\D/g, '')}`}>{t}</a>
                    </Typography>
                  ))}
                </ContactItem>
              ))}
            </ContactContainer>
          </Card>

          <Card as="section" shadow>
            <Typography
              weight="700"
              as="h2"
              style={{ marginBottom: Spaces.lg }}
            >
              Give Us Your Feedback
            </Typography>

            <form onSubmit={handleSubmit} noValidate>
              <FormGroup>
                <Label htmlFor="subject">
                  Subject <RequiredMark aria-label="required">*</RequiredMark>
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  maxLength={60}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.subject}
                  aria-describedby={
                    errors.subject ? 'subject-error' : undefined
                  }
                  required
                />
                {errors.subject && (
                  <ErrorText id="subject-error" role="alert">
                    {errors.subject}
                  </ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="category">
                  Category <RequiredMark aria-label="required">*</RequiredMark>
                </Label>
                <Select
                  id="category"
                  value={formData.category || undefined}
                  onValueChange={handleCategoryChange}
                  items={categoryItems}
                  placeholder="Select..."
                  required
                />
                {errors.category && (
                  <ErrorText id="category-error" role="alert">
                    {errors.category}
                  </ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">
                  Email <RequiredMark aria-label="required">*</RequiredMark>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  maxLength={254}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  required
                />
                {errors.email && (
                  <ErrorText id="email-error" role="alert">
                    {errors.email}
                  </ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">
                  Message <RequiredMark aria-label="required">*</RequiredMark>
                </Label>
                <TextArea
                  style={{ border: '2px solid black', borderRadius: '4px' }}
                  id="message"
                  name="message"
                  rows={6}
                  maxLength={1000}
                  value={formData.message}
                  onChange={(
                    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
                  ) => handleInputChange(e)}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? 'message-error' : undefined
                  }
                  required
                />
                {errors.message && (
                  <ErrorText id="message-error" role="alert">
                    {errors.message}
                  </ErrorText>
                )}
                <Typography>{formData.message.length} / 1000</Typography>
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    maxLength={50}
                    onChange={handleInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="lastInitial">Last Initial</Label>
                  <Input
                    id="lastInitial"
                    name="lastInitial"
                    type="text"
                    maxLength={1}
                    value={formData.lastInitial}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </FormRow>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                style={{ marginTop: Spaces.md }}
              >
                {isSubmitting ? <>Sending...</> : 'Send Message'}
              </Button>
            </form>
          </Card>
        </ContactGrid>
      </FluidContainer>
    </Page>
  );
}
