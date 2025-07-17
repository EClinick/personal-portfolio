import { SYSTEM_CONTEXT } from '../types/types';

// Import the markdown content as a string
import systemPromptMD from './SYSTEM_PROMPT.MD?raw';

export const createEnhancedSystemPrompt = (): string => {
  const { context, instructions } = SYSTEM_CONTEXT;
  
  // Create detailed context section
  const contextDetails = `
## SYSTEM_CONTEXT - Ethan Clinick's Professional Information

TODAY'S DATE: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
TODAY'S TIME: ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
TODAY'S DAY: ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}

### Personal Information
- **Name**: ${context.name}
- **Location**: ${context.location}
- **Email**: ${context.email}
- **Phone**: ${context.phone}
- **LinkedIn**: ${context.linkedin}

### Education
- **Degree**: ${context.education.degree} in ${context.education.major}
- **University**: ${context.education.university}
- **Years**: ${context.education.years}

### Professional Summary
${context.summary}

### Current Experience
${context.experience.map(exp => `
#### ${exp.role} at ${exp.company} (${exp.dates})
**Location**: ${exp.location}

**Key Responsibilities**:
${exp.responsibilities.map(resp => `• ${resp}`).join('\n')}

${exp.links ? `**Links**:\n${exp.links.map(link => `• [${link.name}](${link.url})`).join('\n')}` : ''}
`).join('\n')}

### Key Projects
${context.projects.map(project => `
#### ${project.name}
${project.description}

**Technologies**: ${project.technologies.join(', ')}

**Key Features**:
${project.features.map(feature => `• ${feature}`).join('\n')}

${project.githubUrl ? `**GitHub**: [Repository](${project.githubUrl})` : ''}
${project.links ? project.links.map(link => `**${link.name}**: [Link](${link.url})`).join('\n') : ''}
${project.status ? `**Status**: ${project.status}` : ''}
`).join('\n')}

### Technical Skills
${context.skills.map(skill => `• ${skill}`).join('\n')}

### Instructions Summary
- **Role**: ${instructions.role}
- **Tone**: ${instructions.tone}
- **Preferences**: ${instructions.preferences.map(pref => `\n  • ${pref}`).join('')}
`;

  // Combine the base system prompt with the detailed context
  return `${systemPromptMD}

---

${contextDetails}

---

**Important**: Use the above SYSTEM_CONTEXT information to provide accurate, detailed responses about Ethan Clinick's professional background, experience, and capabilities.`;
};

export default createEnhancedSystemPrompt;