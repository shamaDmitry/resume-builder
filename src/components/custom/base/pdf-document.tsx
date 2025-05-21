import { IResumeData } from "@/types";
import { FC } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image as PDFImage,
} from "@react-pdf/renderer";
import Link from "next/link";

interface DocumentProps {
  formData: IResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#333",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
    objectFit: "cover",
  },
  headerText: {
    flexGrow: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#0056b3",
  },
  title: {
    fontSize: 13,
    color: "#000",
    marginBottom: 10,
  },
  contactInfo: {
    fontSize: 11,
    marginBottom: 10,
  },
  link: {
    color: "blue",
    textDecoration: "underline",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "semibold",
    marginBottom: 10,
    color: "#007bff",
  },
  skillItem: {
    backgroundColor: "#eee",
    padding: "5px 10px",
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 10,
  },
  experienceItem: {
    marginBottom: 15,
  },
  educationItem: {
    marginBottom: 15,
  },
  dateRange: {
    fontSize: 10,
    color: "#888",
    fontStyle: "italic",
  },
});

const PdfDocument: FC<DocumentProps> = ({ formData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {formData.photo ? (
            <PDFImage style={styles.profileImage} src={formData.photo} />
          ) : null}

          <View style={styles.headerText}>
            <Text style={styles.name}>{formData.personalInfo.name}</Text>
            <Text style={styles.title}>{formData.personalInfo.title}</Text>

            <View style={styles.contactInfo}>
              {formData.personalInfo.email && (
                <Link href={`mailto:${formData.personalInfo.email}`}>
                  <Text>{formData.personalInfo.email}</Text>
                </Link>
              )}

              {formData.personalInfo.phone && (
                <Text>{formData.personalInfo.phone}</Text>
              )}

              {formData.personalInfo.address && (
                <Text>{formData.personalInfo.address}</Text>
              )}
            </View>
          </View>
        </View>

        {formData.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>

            <Text>{formData.personalInfo.summary}</Text>
          </View>
        )}

        {formData.experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experiences</Text>

            {formData.experiences.map((exp, index) => (
              <View key={index}>
                <Text style={styles.title}>{exp.position}</Text>

                <Text style={styles.contactInfo}>{exp.company}</Text>
                {(exp.startDate || exp.endDate) && (
                  <Text style={styles.contactInfo}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                )}
                {exp.description && <Text>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {formData.educations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>

            {formData.educations.map((edu, index) => (
              <View key={index}>
                <Text style={styles.title}>{edu.degree}</Text>
                <Text style={styles.contactInfo}>{edu.school}</Text>

                {(edu.startDate || edu.endDate) && (
                  <Text style={styles.contactInfo}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                )}
                {edu.description && <Text>{edu.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {formData.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {formData.skills.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PdfDocument;
