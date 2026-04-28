Smart Campus Hub - MongoDB Schema Design




COLLECTIONS

users
- Stores student and organizer accounts.
- Fields: name, email, role, skills (array), bookmarks (array of opportunity IDs), created_at.

opportunities
- Stores all posted opportunities.
- Fields: title, type (internship/event/hackathon), description, posted_by (user ID), required_skills (array), location, deadline, created_at.

applications
- Stores each application a student submits to an opportunity.
- Fields: user_id, opportunity_id, status (pending/accepted/rejected), cover_note, applied_at.

comments
- Stores comments and discussion threads on opportunities.
- Fields: opportunity_id, user_id, text, created_at.


HOW COLLECTIONS ARE LINKED

- opportunities.posted_by references users._id (who created the post).
- applications.user_id references users._id (who applied).
- applications.opportunity_id references opportunities._id (what they applied to).
- comments.user_id references users._id (who commented).
- comments.opportunity_id references opportunities._id (which post was commented on).
- users.bookmarks is an array of references to opportunities._id (saved posts).


EMBEDDING VS REFERENCING

Embedded:
- users.skills - a user's skills are a small, fixed-size list that is always read together with the user profile. Embedding avoids an extra query.
- users.bookmarks - stored as an array of opportunity ObjectIds inside the user document. Bookmarks are user-specific and always accessed in the context of a user, so embedding the IDs is lightweight and efficient.
- opportunities.required_skills - same reasoning as user skills. Small array, always needed when displaying the opportunity.

Referenced:
- applications references both users and opportunities separately. An application is a relationship between two entities, and either side can have many of them. Embedding would cause unbounded growth or duplication.
- comments references users and opportunities instead of being embedded inside the opportunity document. A popular post could get hundreds of comments. Embedding those would make the opportunity document grow without limit and slow down reads when you only need the post details.


EXTRA FEATURE: SKILL-BASED FILTERING

Both users and opportunities store a skills array. This makes it straightforward to match students to relevant opportunities by comparing users.skills against opportunities.required_skills. A query can find all opportunities where required_skills overlap with a student's skills, enabling a "recommended for you" feed. Opportunities with an empty required_skills array are open to everyone.
