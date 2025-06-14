const tree = {
  question: "What type of item do you want to restore?",
  answers: [
    {
      text: "A user (person)",
      next: {
        question: "Are you an Account Owner or Admin?",
        answers: [
          {
            text: "Yes",
            next: {
              question: "Was it deleted within the last 10 days?",
              answers: [
                {
                  text: "Yes",
                  next: {
                    question: "Note: Restoration may not be possible if a new user with the same email exists, or if your account is at its user license limit. Would you like to proceed?",
                    answers: [
                      {
                        text: "Yes",
                        end: "Contact PagerDuty Support and request restoration. Gather the deleted user's name or email address."
                      },
                      {
                        text: "No",
                        end: "End of flow."
                      }
                    ]
                  }
                },
                {
                  text: "No",
                  end: "Restoration is not possible after 10 days. Share your feedback if you'd like to see self-service restoration features!"
                }
              ]
            }
          },
          {
            text: "No",
            end: "Ask your Account Owner or Admin to submit the request on your behalf."
          }
        ]
      }
    },
    {
      text: "A service",
      next: {
        question: "Was the escalation policy also deleted?",
        answers: [
          {
            text: "Yes",
            end: "Restoration may not be possible. Contact PagerDuty Support to check if engineering assistance is an option (note: time-sensitive, usually within 24 hours)."
          },
          {
            text: "No",
            end: "Contact PagerDuty Support with the service name and details."
          }
        ]
      }
    },
    {
      text: "A service integration",
      next: {
        question: "Do you know the name of the integration and the service it belonged to?",
        answers: [
          {
            text: "Yes",
            end: "Contact PagerDuty Support with these details and the approximate deletion date."
          },
          {
            text: "No",
            end: "Try to gather as much information as possible, then contact Support for help."
          }
        ]
      }
    },
    {
      text: "A live call routing number (US only)",
      next: {
        question: "Was the number provided by PagerDuty (not imported by you)?",
        answers: [
          {
            text: "Yes",
            next: {
              question: "Was it deleted within the last 10 days?",
              answers: [
                {
                  text: "Yes",
                  end: "Contact PagerDuty Support as soon as possible for restoration."
                },
                {
                  text: "No",
                  end: "Restoration is not possible after 10 days."
                }
              ]
            }
          },
          {
            text: "No",
            end: "Restoration is not possible for imported numbers."
          }
        ]
      }
    },
    {
      text: "Something else (schedule, escalation policy, team, extension, account, etc.)",
      end: "Most of these items cannot be restored once deleted. Our Support team can guide you through rebuilding users, services, or other objects. Try to gather as much information as possible, then contact Support for help."
    },
    {
      text: "Not sure / Need help",
      end: "Contact PagerDuty Support with as much detail as possible. We're here to help you find the best solution!"
    }
  ]
};

let currentNode = tree;

function renderNode(node) {
  const questionDiv = document.getElementById('question');
  const answersDiv = document.getElementById('answers');
  questionDiv.textContent = node.question || '';
  answersDiv.innerHTML = '';

  if (node.answers) {
    node.answers.forEach((ans, idx) => {
      const btn = document.createElement('button');
      btn.textContent = ans.text;
      btn.onclick = () => {
        if (ans.next) {
          renderNode(ans.next);
        } else if (ans.end) {
          questionDiv.textContent = '';
          answersDiv.innerHTML = `<p>${ans.end}</p><button onclick="location.reload()">Start Over</button>`;
        }
      };
      answersDiv.appendChild(btn);
    });
  } else if (node.end) {
    answersDiv.innerHTML = `<p>${node.end}</p><button onclick="location.reload()">Start Over</button>`;
  }
}

window.onload = () => renderNode(tree);
