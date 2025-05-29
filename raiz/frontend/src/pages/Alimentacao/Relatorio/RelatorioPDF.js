// src/pages/Alimentacao/Relatorio/RelatorioPDF.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  body: { padding: 30, fontSize: 12, fontFamily: 'Helvetica' },
  title: { fontSize: 18, marginBottom: 10, textAlign: 'center' },
  section: { marginVertical: 10 },
  bold: { fontWeight: 'bold' },
  listItem: { marginLeft: 10, marginTop: 4 },
});

const RelatorioPDF = ({ dados }) => (
  <Document>
    <Page size="A4" style={styles.body}>
      <Text style={styles.title}>Relatório Nutricional</Text>
      <Text>Data: {dados.data}</Text>

      <View style={styles.section}>
        <Text style={styles.bold}>Água:</Text>
        <Text>{dados.agua.atual}ml de {dados.agua.meta}ml</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>Macronutrientes:</Text>
        {Object.entries(dados.nutrientes).map(([k, v]) => (
          <Text key={k} style={styles.listItem}>
            {k.charAt(0).toUpperCase() + k.slice(1)}: {v.atual} / {v.meta}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>Refeições:</Text>
        {dados.refeicoes.map((ref, i) => (
          <View key={i} style={styles.listItem}>
            <Text>{ref.nome}:</Text>
            {ref.alimentos.length > 0 ? ref.alimentos.map((a, j) => (
              <Text key={j} style={{ marginLeft: 10 }}>- {a}</Text>
            )) : <Text style={{ marginLeft: 10 }}>Nenhum alimento registrado</Text>}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>Recomendações:</Text>
        {dados.recomendacoes.map((r, i) => (
          <Text key={i} style={styles.listItem}>• {r}</Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default RelatorioPDF;
