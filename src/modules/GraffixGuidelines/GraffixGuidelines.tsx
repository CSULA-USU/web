import styled from 'styled-components';
import { Expandable, FluidContainer, Typography } from 'components';
import { Colors, Spaces } from 'theme';
import { BiChevronRight } from 'react-icons/bi';
import { useBreakpoint } from 'hooks';

const GuidelineContainer = styled.div`
  border: 1px solid ${Colors.greyLighter};
  margin: ${Spaces.sm} 0;
`;

const indicator = <BiChevronRight color="black" size={48} />;

export const GraffixGuidelines = () => {
  const { isMobile } = useBreakpoint();

  return (
    <FluidContainer>
      <Typography
        as="h2"
        variant="title"
        size={isMobile ? 'lg' : '2xl'}
        margin={`0 0 ${Spaces.xl} 0`}
      >
        Guidelines
      </Typography>

      <GuidelineContainer>
        <FluidContainer>
          <Expandable
            indicator={indicator}
            header={
              <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
                Design Guidelines
              </Typography>
            }
          >
            <ol>
              <li>
                The Graffix Department designs all event marketing for the U-SU
                departments.
                <ul>
                  <li>
                    The exception is if a campus partner handles the designs for
                    the events marketing.
                    <ul>
                      <li>
                        If a collaboration with any U-SU department the Graffix
                        Department will need to verify the branding and
                        marketing description of the U-SU to post the designs
                        around campus.
                      </li>
                      <li>
                        In the event the Graffix Department does not approve the
                        design then it releases the liability of the Graffix
                        departments and the department in question will be
                        responsible for any issues that arise from the design.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Department social media designs are only required as a
                    graphics request if the event is going up on presence.
                    <ul>
                      <li>
                        There are specific size requirements for presence cover
                        images.
                      </li>
                      <li>
                        Seven business days is required to schedule and resize
                        your design properly.
                      </li>
                    </ul>
                  </li>
                  <li>
                    If Presence is not used for social media content, U-SU logos
                    are still required on your designs.
                    <ul>
                      <li>
                        Your director will approve your design based on branding
                        and accessibility guidelines provided by the Graffix
                        Department.
                      </li>
                      <li>
                        Adhering to the branding and accessibility guidelines
                        falls on the department and the director approving the
                        design.
                      </li>
                      <li>
                        Graphics does not assume responsibility for these
                        designs.
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                All design artwork created by the Graffix Department will have
                the Graffix branding to differentiate from internal department
                designs.
              </li>
              <li>
                All design requests require at least 8 weeks to fulfill the
                request if 4 weeks of marketing is requested.
                <ul>
                  <li>
                    Graffix needs a minimum of 3 weeks for design creation and
                    review time with the programmer.
                  </li>
                  <li>
                    If you are out of the office for an extended period, please
                    let us know so we can plan accordingly.
                    <ul>
                      <li>
                        Example: A conference taking you out of town for 4-5
                        workdays.
                      </li>
                      <li>
                        An option is to assign someone to approve designs in
                        your absence.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Adding promo items to your request extends the request time
                    to 5-8 working days.
                    <ul>
                      <li>
                        The promo item needs to be approved by the department
                        director and the Graffix department which is based on
                        budget and capacity.
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                We require all information related to the submittal at the time
                of submission.
                <ul>
                  <li>
                    Exception: If you are still trying to sign speakers or
                    entertainment acts.
                  </li>
                </ul>
              </li>
            </ol>
          </Expandable>
        </FluidContainer>
      </GuidelineContainer>

      <GuidelineContainer>
        <FluidContainer>
          <Expandable
            indicator={indicator}
            header={
              <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
                Request Guidelines
              </Typography>
            }
          >
            <ol>
              <li>
                All event marketing for the U-SU departments is required to be
                designed by the Graffix Department unless it is a collaboration
                with a campus partner that is handling the designs.
                <ul>
                  <li>
                    Graffix requires a space reservation for all graphics
                    projects prior to submitting a graphics request.
                    <ul>
                      <li>
                        All non U-SU space events will be submitted as a
                        standard graphics request. However, they still require a
                        reservation prior to submitting a graphics request.
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                If U-SU logos are being used in the marketing, the director is
                required to approve it.
                <ul>
                  <li>
                    Any graphics requests submitted after the deadline are based
                    on the capacity of the department and require at least 2
                    weeks for design time.
                    <ul>
                      <li>
                        Ex: If the programmer needs at least a week of marketing
                        time then the request should be given 3 weeks prior to
                        the event date.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Any non-design printing requests are accepted based on the
                    capacity of the department at the time of request and are
                    required to be submitted 2 days before the date needed.
                  </li>
                </ul>
              </li>
            </ol>
          </Expandable>
        </FluidContainer>
      </GuidelineContainer>

      <GuidelineContainer>
        <FluidContainer>
          <Expandable
            indicator={indicator}
            header={
              <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
                Submittal Requirements
              </Typography>
            }
          >
            <ol>
              <li>
                Event Start &amp; End Time
                <ul>
                  <li>
                    What is the theme of your event?
                    <ul>
                      <li>
                        Colors schemes, style, perception
                        <ul>
                          Ex. Warm colors, inspirational leadership, building
                          community, afro-futurism theme
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                Date &amp; Location
                <ul>
                  <li>
                    What is the purpose or goal of the event?
                    <ul>
                      <li>
                        Example:
                        <ul>
                          I want to provide the students with a cultural and
                          learning experience.
                        </ul>
                        <ul>I want them to sign up for our newsletter.</ul>
                        <ul>I want to bring awareness to a specific topic.</ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                Reservation Number for U-SU Building Reservations{' '}
                <em>(not required for outside reservations)</em>
                <ul>
                  <li>
                    Who is your target student demographic?
                    <ul>
                      <li>
                        Example:
                        <ul>
                          I want to target transfer students so that they are
                          aware of the services we provide.
                        </ul>
                        <ul>
                          I want to target Latinx students who are 1st gen
                          students in social work.
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                Presence Calendar Description
                <ul>
                  <li>
                    Mood Boards
                    <ul>
                      <li>
                        Please be specific to certain areas of inspiration.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Any non-design printing requests are accepted based on the
                    capacity of the department at the time of request and are
                    required to be submitted 2 days before the date needed.
                  </li>
                </ul>
              </li>
              <li>Event Title</li>
              <li>
                Series? How many events? Are they different designs within the
                same series? Use the same design for all of them?
                <ul>
                  <li>
                    A Word Doc with Relatable Images
                    <ul>
                      <li>
                        If you want us to use specific images, please provide
                        high-resolution images.
                      </li>
                      <ul>
                        They will come out blurry if the images are low
                        resolution.
                      </ul>
                    </ul>
                  </li>
                </ul>
              </li>
            </ol>
          </Expandable>
        </FluidContainer>
      </GuidelineContainer>
    </FluidContainer>
  );
};
