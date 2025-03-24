import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import textwrap  

df = pd.read_csv("DiaryOfACEO_episodes.csv")
df.info()  # 304 rows and 16 columns, 1 episode description is empty

print(df.isnull().sum())

df["episode_description"].fillna("no description", inplace = True)

print("Duplicates:", df.duplicated().sum())

print(df.describe()) # summary of numerical columns

print(df.nunique()) # unique values in each column


bottom_episodes = df.nsmallest(5, "views")
bottom_episodes["wrapped_name"] = bottom_episodes["episode_name"].apply(lambda x: "\n".join(textwrap.wrap(x, width=20)))

plt.figure(figsize=(18, 6))
sns.barplot(data=bottom_episodes, x="views", y="wrapped_name", palette="Reds_r")
plt.xlabel("Views")
plt.ylabel("Episode Name")
plt.title("Bottom 5 Least Viewed Episodes")
plt.show()


