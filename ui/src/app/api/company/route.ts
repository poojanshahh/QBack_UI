import { Database, connectToDB } from "@/database";

const PRIMARY_COMPANIES_PRODUCTS = [
  {
    label: "Dataminr",
    products: [
      {
        label: "Dataminr for Corporate Security",
        description:
          "Dataminr's platform provides real-time information discovery and security solutions for corporate and public sector clients. It offers critical event detection, early threat warning, and situational awareness.",
      },
      {
        label: "Public Alerts",
        description:
          "Dataminr's platform can provide customized public alerts based on specific keywords, locations, or topics of interest, delivering real-time information on critical events.",
      },
      {
        label: "Situational Awareness",
        description:
          "Dataminr's platform offers real-time situational awareness by consolidating relevant information from various sources, including social media and publicly available data.",
      },
      {
        label: "Geospatial Analysis",
        description:
          "The platform includes geospatial analysis capabilities, allowing organizations to visualize data and events on a map, which is valuable for monitoring global operations and assessing threats across different locations.",
      },
      {
        label: "Alerts and Notifications",
        description:
          "Dataminr users can receive alerts and notifications through various channels, including email, SMS, mobile apps, and integration with other communication and incident management systems.",
      },
    ],
  },
  {
    label: "LifeRaft (Navigator)",
    products: [
      {
        label: "LifeRaft Navigator",
        description:
          "LifeRaft's Navigator is a social media and web intelligence platform designed to help organizations monitor online data for situational awareness, early warning, and risk mitigation.",
      },
      {
        label: "Data Intelligence",
        description:
          "Navigator provides data intelligence by collecting and analyzing publicly available information from social media and web sources to identify emerging risks and critical events.",
      },
      {
        label: "Risk Monitoring",
        description:
          "The platform supports risk monitoring by delivering real-time alerts and insights on potential threats, enabling organizations to stay informed and respond proactively.",
      },
      {
        label: "Incident Response",
        description:
          "LifeRaft Navigator aids in incident response by providing information and intelligence that can be used to make informed decisions and take appropriate actions during crises.",
      },
      {
        label: "Custom Alerts",
        description:
          "Users can set up custom alerts based on keywords, locations, and topics to receive notifications on specific events and developments.",
      },
    ],
  },
  {
    label: "OnSolve",
    products: [
      {
        label: "OnSolve Critical Communications",
        description:
          "OnSolve provides critical communication solutions for emergency notification and incident management, enabling organizations to reach and protect their people during critical events.",
      },
      {
        label: "Emergency Notification",
        description:
          "The platform supports emergency notification by sending alerts and messages to employees and stakeholders through various communication channels, ensuring timely and reliable communication.",
      },
      {
        label: "Incident Response Management",
        description:
          "OnSolve's solution aids in incident response management, offering features for incident tracking, resource allocation, and coordinated response during crises and emergencies.",
      },
      {
        label: "Business Continuity",
        description:
          "OnSolve's platform assists organizations in maintaining business continuity by providing tools for emergency planning, response, and recovery.",
      },
      {
        label: "Community Engagement",
        description:
          "The platform supports community engagement by facilitating communication with communities and stakeholders, ensuring two-way interaction during normal operations and emergencies.",
      },
    ],
  },

  {
    label: "Resolver",
    products: [
      {
        label: "Incident Reporting and Management",
        description:
          "Resolver's incident reporting and management software allows organizations to efficiently report, track, and manage various incidents, including security, health, and safety incidents.",
      },
      {
        label: "Case Management",
        description:
          "Resolver's case management solutions enable organizations to manage cases and investigations effectively, streamlining the process from initiation to resolution.",
      },
      {
        label: "Investigations",
        description:
          "Resolver provides tools for conducting investigations, including evidence gathering, interviews, and documentation, helping organizations uncover and mitigate risks.",
      },
      {
        label: "Risk Assessment and Mitigation",
        description:
          "Resolver's platform supports risk assessment and mitigation by helping organizations identify and address potential risks and compliance issues.",
      },
    ],
  },
  {
    label: "Skopenow",
    products: [
      {
        label: "Data Intelligence and Analysis",
        description:
          "Skopenow's platform offers data intelligence and analysis capabilities, allowing organizations to collect and analyze online data for various purposes, including due diligence and risk assessment.",
      },
      {
        label: "Due Diligence",
        description:
          "Skopenow's solutions assist organizations in conducting due diligence by providing comprehensive data on individuals and entities, helping them make informed decisions.",
      },
      {
        label: "Risk Mitigation",
        description:
          "Skopenow helps organizations mitigate risks by identifying potential threats or vulnerabilities through data analysis.",
      },
      {
        label: "Online Investigations",
        description:
          "Skopenow's platform supports online investigations by providing tools and data sources for uncovering information and insights.",
      },
    ],
  },
  {
    label: "Everbridge",
    products: [
      {
        label: "Mass Notification",
        description:
          "Everbridge's mass notification platform provides comprehensive tools for sending alerts and notifications to a wide range of devices and channels during emergencies and critical events.",
      },
      {
        label: "Critical Event Management (CEM)",
        description:
          "Everbridge's CEM platform unifies critical event management, offering incident tracking, response coordination, and situational awareness for organizations.",
      },
      {
        label: "Incident Management",
        description:
          "Everbridge's incident management solution supports automated and efficient incident response, including incident tracking and resource allocation.",
      },
      {
        label: "IT Alerting",
        description:
          "The IT alerting platform streamlines incident response for technology and IT teams, with automated alerting and real-time communication during technical incidents.",
      },
      {
        label: "Safety Connection",
        description:
          "Everbridge's Safety Connection prioritizes employee safety and well-being, offering two-way communication, location sharing, and incident reporting.",
      },
      {
        label: "Crisis Management",
        description:
          "Everbridge's crisis management solutions help organizations plan for and manage crises, offering features for building crisis plans, conducting exercises, and tracking actions during an incident.",
      },
      {
        label: "Visual Command Center (VCC)",
        description:
          "VCC provides real-time global threat intelligence and visualization, supporting organizations in monitoring and responding to global threats and incidents.",
      },
      {
        label: "COVID-19 Shield",
        description:
          "Everbridge introduced COVID-19 Shield to help organizations manage their response to the pandemic, including monitoring employee health, contact tracing, and communication.",
      },
      {
        label: "Public Warning",
        description:
          "Used by government agencies, Public Warning enables the delivery of alerts and warnings to the public through various channels, including Wireless Emergency Alerts (WEA) and IPAWS.",
      },
      {
        label: "Community Engagement",
        description:
          "Everbridge's Community Engagement platform supports organizations in engaging with communities and stakeholders, facilitating two-way communication and engagement through various channels.",
      },
    ],
  },
  {
    label: "AlertMedia",
    products: [
      {
        label: "Mass Communication and Notification",
        description:
          "AlertMedia's platform enables organizations to send mass communications and emergency notifications to employees, ensuring they receive critical information during incidents or emergencies.",
      },
      {
        label: "Emergency Alerts",
        description:
          "The system provides emergency alerts and notifications through various channels, including SMS, email, and mobile apps, to ensure timely and reliable communication.",
      },
      {
        label: "Employee Safety and Well-being",
        description:
          "AlertMedia prioritizes employee safety and well-being by providing tools to reach and protect employees during critical events, such as natural disasters and security threats.",
      },
      {
        label: "Incident Response",
        description:
          "The platform supports incident response by facilitating communication and ensuring that employees are informed and can take appropriate actions during incidents.",
      },
    ],
  },
  {
    label: "Factal",
    products: [
      {
        label: "Real-Time Incident and Crisis Management",
        description:
          "Factal offers a real-time incident and crisis management platform that delivers critical information as it unfolds, enabling organizations to respond effectively to emergencies and incidents.",
      },
      {
        label: "Situational Awareness",
        description:
          "The platform enhances situational awareness by providing real-time updates and alerts, ensuring that organizations have the latest information to make informed decisions.",
      },
      {
        label: "Critical Information Delivery",
        description:
          "Factal focuses on delivering critical information to organizations, allowing them to respond promptly to events that could impact their operations and safety.",
      },
    ],
  },
  {
    label: "Topo.ai (Crisis24)",
    products: [
      {
        label: "Global Threat Intelligence",
        description:
          "Crisis24, known as Topo.ai, provides global threat intelligence and real-time information on critical events and risks worldwide, helping organizations stay informed and prepared.",
      },
      {
        label: "Situational Awareness",
        description:
          "The platform enhances situational awareness by offering real-time updates and insights, empowering organizations to proactively respond to potential threats.",
      },
      {
        label: "Real-Time Information on Critical Events",
        description:
          "Crisis24 delivers real-time information on critical events, ensuring that organizations are aware of emerging risks and incidents.",
      },
    ],
  },
  {
    label: "D3 Security",
    products: [
      {
        label: "Incident Response",
        description:
          "D3 Security's incident response solutions streamline the incident management process, allowing organizations to respond efficiently to security incidents.",
      },
      {
        label: "Case Management",
        description:
          "The platform supports case management by providing tools to manage cases and investigations, ensuring that organizations have a structured and efficient process.",
      },
      {
        label: "Security Operations Automation",
        description:
          "D3 Security's automation capabilities help organizations automate security operations, improving efficiency and reducing response times.",
      },
      {
        label: "Investigation",
        description:
          "D3 Security provides tools for conducting investigations, from initial reporting to case closure, helping organizations uncover and address security issues.",
      },
    ],
  },
  {
    label: "Kaseware",
    products: [
      {
        label: "Case Management",
        description:
          "Kaseware's case management software assists organizations in managing and tracking cases and incidents efficiently, from inception to resolution.",
      },
      {
        label: "Investigations",
        description:
          "The platform supports investigations by providing tools for evidence collection, documentation, and collaboration, ensuring thorough and effective investigative processes.",
      },
      {
        label: "Incident Tracking",
        description:
          "Kaseware enables organizations to track and manage incidents, ensuring a structured and organized approach to incident management.",
      },
      {
        label: "Workflow Automation",
        description:
          "The platform offers workflow automation capabilities, streamlining processes and reducing manual efforts in case management and investigations.",
      },
    ],
  },
  {
    label: "Flashpoint",
    products: [
      {
        label: "Business Risk Intelligence",
        description:
          "Flashpoint offers business risk intelligence, helping organizations identify and mitigate threats and risks to their operations.",
      },
      {
        label: "Threat Detection on the Deep and Dark Web",
        description:
          "The platform specializes in detecting threats and risks in the deep and dark web, providing insights into potential vulnerabilities.",
      },
      {
        label: "Vulnerability Assessment",
        description:
          "Flashpoint supports vulnerability assessment by identifying and monitoring potential risks in the digital landscape.",
      },
      {
        label: "Risk Mitigation",
        description:
          "The platform helps organizations mitigate risks by providing actionable intelligence and insights to protect against threats and vulnerabilities.",
      },
    ],
  },
];

const COMPANY = [
  {
    label: "Dataminr",
    priority: "primary",
    domain: "dataminr.com",
  },
  {
    label: "LifeRaft (Navigator)",
    priority: "primary",
    domain: "liferaftinc.com",
  },
  {
    label: "OnSolve",
    priority: "primary",
    domain: "onsolve.com",
  },
  {
    label: "Resolver",
    priority: "primary",
    domain: "resolver.com",
  },
  {
    label: "Skopenow",
    priority: "primary",
    domain: "skopenow.com",
  },
  {
    label: "Everbridge",
    priority: "primary",
    domain: "everbridge.com",
  },
  {
    label: "AlertMedia",
    priority: "primary",
    domain: "alertmedia.com",
  },
  {
    label: "Factal",
    priority: "primary",
    domain: "factal.com",
  },
  {
    label: "Topo.ai (Crisis24)",
    priority: "primary",
    domain: "topo.ai",
  },
  {
    label: "D3 Security",
    priority: "primary",
    domain: "d3security.com",
  },
  {
    label: "Kaseware",
    priority: "primary",
    domain: "kaseware.com",
  },
  {
    label: "Flashpoint",
    priority: "primary",
    domain: "flashpoint.io",
  },

  {
    label: "Stratfor",
    priority: "secondary",
    domain: "worldview.stratfor.com",
  },
  {
    label: "Navigate 360 (formerly Social Sentinel)",
    priority: "secondary",
    domain: "navigate360.com",
  },
  {
    label: "Palantir",
    priority: "secondary",
    domain: "palantir.com",
  },
  {
    label: "Babelstreet",
    priority: "secondary",
    domain: "babelstreet.com",
  },
  {
    label: "Lumina Analytics",
    priority: "secondary",
    domain: "luminaanalytics.com",
  },
  {
    label: "TrapWire",
    priority: "secondary",
    domain: "trapwire.com",
  },
  {
    label: "Cognyte",
    priority: "secondary",
    domain: "cognyte.com",
  },
  {
    label: "Cellebrite",
    priority: "secondary",
    domain: "cellebrite.com",
  },
  {
    label: "BlackBerry",
    priority: "secondary",
    domain: "blackberry.com",
  },
  {
    label: "Silobreaker",
    priority: "secondary",
    domain: "silobreaker.com",
  },
  {
    label: "Cobwebs Technologies",
    priority: "secondary",
    domain: "cobwebs.com",
  },
  {
    label: "CaseIQ (formerly i-Sight)",
    priority: "secondary",
    domain: "i-sight.com",
  },
  {
    label: "Hivewatch",
    priority: "secondary",
    domain: "hivewatch.com",
  },
  {
    label: "Seerist (a ControlRisks company)",
    priority: "secondary",
    domain: "seerist.com",
  },
  {
    label: "Eptura (ProxyClick)",
    priority: "secondary",
    domain: "eptura.com",
  },
  {
    label: "AlertMedia",
    priority: "secondary",
    domain: "alertmedia.com",
  },
  {
    label: "International SOS, Crisis24, Anvil, Global Guardian",
    priority: "secondary",
    domain: "",
  },
  {
    label: "Cap Index",
    priority: "secondary",
    domain: "capindex.com",
  },
  {
    label: "Juvare",
    priority: "secondary",
    domain: "juvare.com",
  },
];

export async function GET(request: Request) {
  const companies = COMPANY.map((company) => {
    if (company.priority === "secondary") return null;
    return {
      ...company,
      products:
        PRIMARY_COMPANIES_PRODUCTS.find((p) => p.label === company.label)
          ?.products || [],
    };
  }).filter(Boolean);

  // companies.unshift({
  //   label: "Ontic",
  //   priority: "own",
  //   products: PRODUCTS,
  // });

  return new Response(JSON.stringify(companies));
}

export async function POST(request: Request) {
  const Company = await connectToDB({ dbName: Database.company });
  const { company } = await request.json();

  const query = {
    label: company.label,
  };
  const updatedCompany = await Company?.findOneAndUpdate(query, company, {
    upsert: true,
    new: true,
  });
  return new Response(JSON.stringify({ company: updatedCompany }));
}
